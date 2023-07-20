//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

/************ Controllers  *************/

//Creation
async function createEmployee(req, res) {
    let { email, password, confirmation, id } = req.body;

    try {
        //Check if datas are valids
        if (!email || !password || !confirmation) {
            return res.send("Données manquantes");
        } else if (password !== confirmation) {
            return res.status(400).json({
                message: "Les mots de passes doivent être identiques",
            });
        }

        //Check if employee already exists
        let employee = await db.Employee.findOne({
            where: { email: email },
            raw: true,
        });
        if (employee) {
            return res.status(409).json(`L'employé ${email} existe déjà !`);
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
        confirmation = hashedPassword;

        //Employee creation
        employee = await db.Employee.create({
            id: id,
            email: email,
            password: hashedPassword,
            confirmation: confirmation,
        });

        return res.json({
            message: "Employé créé avec succès",
            data: employee,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//login
async function loginEmployee(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.send("Données manquantes");
        }

        //Retrieve employee
        let employee = await db.Employee.findOne({
            where: { email: email },
            raw: true,
        });
        if (!employee) {
            res.status(400).json({ message: "Cet employé n'existe pas" });
        }

        //Check password
        const isValid = await bcrypt.compare(password, employee.password)
        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe invalide" });
        }
        return res.json({ message: "Bienvenue !", employee });
        
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//getAll
async function getAllEmployees(req, res) {
    try {
        const employees = await db.Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//getOne
async function getEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the employee
        let employee = await db.Employee.findOne({
            where: { id: id },
            raw: true,
        });
        if (employee === null) {
            res.status(404).json({ message: "Cet employé n'existe pas" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update Emloyee
async function updateEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { firstname, lastname, email } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the employee
        let employee = await db.Employee.findOne(req.body, {
            where: { id: id },
            raw: true,
        });

        if (employee === null) {
            res.status(404).json({
                message: "L'employé recherché n'existe pas",
            });
        }

        //update
        employee = await db.Employee.update(
            {
                email: email,
                firstname: firstname,
                lastname: lastname,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Employé mis à jour !",
            data: { email, firstname, lastname },
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Delete Employee
async function deleteEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of admin
        const employee = await db.Employee.destroy({
            where: { id: id },
            force: true,
        });
        if (!employee) {
            return res
                .status(404)
                .json({ message: "L'employé recherché n'existe pas" });
        }

        res.status(200).json({
            message: "Cet employé a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export {
    createEmployee,
    getAllEmployees,
    getEmployee,
    loginEmployee,
    updateEmployee,
    deleteEmployee,
};

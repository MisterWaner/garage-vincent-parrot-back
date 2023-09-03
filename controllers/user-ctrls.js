//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import generateTemporaryPassword from "../functions/generateTemporaryPassword.js";
import generateEmail from "../functions/generateEmail.js";
config();

/************ Controllers  *************/

//Creation of an admin
async function createAdmin(req, res) {
    try {
        let { firstname, lastname, password, confirmation } = req.body;
        const roleId = 1;

        //Check if datas are valid
        if (!firstname || !lastname || !password || !confirmation) {
            return res.send("Des données sont manquantes");
        }
        if (password !== confirmation) {
            return res.status(400).json({
                message: "Les mots de passes doivent être identiques",
            });
        }
        //Check if admin already exist
        let admin = await db.User.findOne({
            where: { email: generateEmail(firstname, lastname) },
            raw: true,
        });
        if (admin) {
            return res
                .status(409)
                .json({ message: "Utilisateur déjà existant" });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUND)
        );
        password = hashedPassword;
        confirmation = hashedPassword;

        //User creation
        admin = await db.User.create({
            email: generateEmail(firstname, lastname),
            firstname: firstname,
            lastname: lastname,
            password: password,
            confirmation: confirmation,
            roleId: roleId,
            services: "Direction",
            isAdmin: true,
        });

        //Admin creation
        admin = await db.Admin.create({
            userId: admin.id,
        });

        console.log(admin);
        return res.status(201).json({
            message: "Admin créé",
            data: admin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

/******************************* CREATION EMPLOYEES ***********************************/
async function createEmployee(req, res) {
    try {
        const { lastname, firstname, services } = req.body;
        let password;
        const roleId = 2;

        //Check if datas are valid
        if (!lastname || !firstname || !services) {
            return res.send("Des données sont manquantes");
        }
        //Check if employee already exist
        let employee = await db.User.findOne({
            where: { email: generateEmail(firstname, lastname) },
            raw: true,
        });
        if (employee) {
            return res
                .status(409)
                .json({ message: "Utilisateur déjà existant" });
        }

        //generate password
        password = generateTemporaryPassword(64);
        //Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUND)
        );

        //create employee
        employee = await db.User.create({
            email: generateEmail(firstname, lastname),
            lastname: lastname,
            firstname: firstname,
            password: hashedPassword,
            services: services,
            roleId: roleId,
        });

        const newEmployee = await db.Employee.create({
            userId: employee.id,
        });
        console.log(newEmployee);
        return res.status(201).json({
            message: "Utilisateur créé",
            data: employee,
            password: password,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//getAll User
async function getAllUsers(req, res) {
    try {
        const users = await db.User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//getOne User
async function getUser(req, res) {
    try {
        const id = parseInt(req.params.id);
        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the user
        let user = await db.User.findOne({
            where: { id: id },
            raw: true,
        });
        if (!user) {
            res.status(404).json({
                message: "Cet utilisateur n'existe pas",
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

/*********************** UDATE USER EMPLOYEE *********************************/
async function updateUserEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { firstname, lastname, services} = req.body;
        

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the user
        let updatedUserEmployee = await db.User.findOne(req.body, {
            where: { id: id, roleId: 2 },
            raw: true,
        });
        if (!updatedUserEmployee) {
            res.status(404).json({
                message: "L'utilisateur recherché n'existe pas",
            });
        }
        console.log(updatedUserEmployee);
        if (!firstname || !lastname || !services) {
            return res.send("Des données sont manquantes");
        }

        const email = generateEmail(firstname, lastname);
        //update
        updatedUserEmployee = await db.User.update(
            {
                ...updatedUserEmployee,
                firstname: firstname,
                lastname: lastname,
                services: services,
                email: email,
            },
            {
                where: { id: id },
            }
        );
        console.log("utilisateur mis a jour ",updatedUserEmployee);

        return res.json({
            message: "Utilisateur à jour !",
            data: {updatedUserEmployee, email: email},
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.log("Erreur lors de la mise à jour : ", error);
    }
}

//Delete User
async function deleteUserEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of user
        const employee = await db.User.destroy({
            where: { id: id, roleId: 2 },
            force: true,
        });
        if (!employee) {
            return res
                .status(404)
                .json({ message: "L'utilisateur recherché n'existe pas" });
        }

        res.status(200).json({
            message: "Cet utilisateur a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export {
    createAdmin,
    createEmployee,
    getAllUsers,
    getUser,
    updateUserEmployee,
    deleteUserEmployee,
};

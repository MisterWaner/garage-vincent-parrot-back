//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

/************ Controllers  *************/

//Creation

//login
async function loginAdmin(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.send("Données manquantes");
        }

        //Retrieve admin
        let admin = await db.Admin.findOne({
            where: { email: email },
            raw: true,
        });
        if (!admin) {
            res.status(400).json({ message: "Cette admin n'existe pas" });
        }

        //Check password
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe invalide" });
        }

        return res.json({ message: "Bienvenue !", admin });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//getAll
async function getAllAdmins(req, res) {
    try {
        const admins = await db.User.findAll({ where: { roleId: 1 } });
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//getOne
async function getAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the admin
        let admin = await db.User.findOne({
            where: { id: id, roleId: 1 },
            raw: true,
        });
        if (!admin) {
            return res.status(404).json({ message: "Cet admin n'existe pas" });
        }
        return res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update Admin
async function updateAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        let { firstname, lastname, email, password, confirmation } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the admin
        let admin = await db.User.findOne(req.body, {
            where: { id: id, roleId: 1 },
            raw: true,
        });
        if (!admin) {
            return res.status(404).json({
                message: "L'admin recherché n'existe pas",
            });
        }

        if (password !== confirmation) {
            return res.status(400).json({
                message: "Les mots de passes doivent être identiques",
            });
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUND)
        );
        confirmation = hashedPassword;

        //update
        admin = await db.User.update(
            {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                confirmation: confirmation,
            },
            {
                where: { id: id, roleId: 1 },
            }
        );

        res.json({
            message: "Admin à jour !",
            data: admin,
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Delete Admin
async function deleteAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of admin
        const admin = await db.User.destroy({
            where: { id: id, roleId: 1 },
            force: true,
        });
        if (!admin) {
            return res
                .status(404)
                .json({ message: "L'admin recherché n'existe pas" });
        }

        res.status(200).json({
            message: "Cet admin a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { loginAdmin, getAllAdmins, getAdmin, updateAdmin, deleteAdmin };

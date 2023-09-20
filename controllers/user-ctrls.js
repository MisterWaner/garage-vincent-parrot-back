//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import generateTemporaryPassword from "../functions/generateTemporaryPassword.js";
import generateEmail from "../functions/generateEmail.js";
config();

/************ Controllers  *************/

/********************* CREATION EMPLOYEE ***********************************/
async function createUser(req, res) {
    try {
        const { firstname, lastname, services, role } = req.body;

        //Check if datas are valid
        if (!firstname || !lastname || !services || !role) {
            return res.send("Des données sont manquantes");
        }
        //Check if user already exist
        const user = await db.User.findOne({
            where: { email: generateEmail(firstname, lastname) },
            raw: true,
        });
        if (user) {
            return res
                .status(409)
                .json({ message: "Utilisateur déjà existant" });
        }

        //generate password
        const password = generateTemporaryPassword(64);
        //Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUND)
        );

        //User creation
        const newUser = await db.User.create({
            email: generateEmail(firstname, lastname),
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            role: role,
            services: services,
        });

        console.log(newUser);
        return res.status(200).json({
            message: "Utilisateur créé",
            data: newUser,
            password: password,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

/********************* GET ALL USERS ***********************************/
async function getAllUsers(req, res) {
    try {
        const users = await db.User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

/********************* GET ONE USER ***********************************/
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

/*********************** UPDATE USER *********************************/
async function updateUser(req, res) {
    try {
        const id = req.params.id;
        let { firstname, lastname, services, role } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the user
        let updatedUser = await db.User.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!updatedUser) {
            res.status(404).json({
                message: "L'utilisateur recherché n'existe pas",
            });
        }
        console.log(updatedUser);
        if (!firstname || !lastname || !services || !role) {
            return res.send("Des données sont manquantes");
        }

        //generate email
        const email = generateEmail(firstname, lastname);
        //update
        updatedUser = await db.User.update(
            {
                ...updatedUser,
                firstname: firstname,
                lastname: lastname,
                services: services,
                email: email,
                role: role,
            },
            {
                where: { id: id },
            }
        );
        console.log("utilisateur mis a jour ", updatedUser);

        return res.json({
            message: "Utilisateur à jour !",
            data: { updatedUser, email: email },
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.log("Erreur lors de la mise à jour : ", error);
    }
}

/************************ DELETE USER *********************************/
async function deleteUser(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of user
        const user = await db.User.destroy({
            where: { id: id },
            force: true,
        });
        if (!user) {
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

export { createUser, getAllUsers, getUser, updateUser, deleteUser };

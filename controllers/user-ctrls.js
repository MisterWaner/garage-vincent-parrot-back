//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import generateTemporaryPassword from "../functions/generateTemporaryPassword.js";
import generateEmail from "../functions/generateEmail.js";
config();

/************ Controllers  *************/

/********************* CREATION USER ***********************************/
async function createUser(req, res) {
    try {
        let { firstname, lastname, services, isAdmin } = req.body;

        //Check if datas are valid
        if (!firstname || !lastname || !services) {
            return res.send("Des données sont manquantes");
        }
        //Check if user already exist
        let user = await db.User.findOne({
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

        let roleId;
        //Check if admin
        if (isAdmin === true) {
            roleId = 1;
        } else if (isAdmin === false) {
            roleId = 2;
        }

        //User creation
        user = await db.User.create({
            email: generateEmail(firstname, lastname),
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            roleId: roleId,
            services: services,
            isAdmin: isAdmin,
        });

        let newUserData;

        switch (roleId) {
            case 1:
                newUserData = await db.Admin.create({
                    userId: user.id,
                });
                break;
            case 2:
                newUserData = await db.Employee.create({
                    userId: user.id,
                });
                break;
            default:
                return res.status(500).json({ message: "Rôle non valide" });
        }

        console.log(newUserData);
        return res.status(201).json({
            message: "Utilisateur créé",
            data: user, newUserData,
            password: password,
        })
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

/*********************** UDATE USER EMPLOYEE *********************************/
async function updateUserEmployee(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { firstname, lastname, services } = req.body;

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

        //generate email
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
                where: { id: id, roleId: 2 },
            }
        );
        console.log("utilisateur mis a jour ", updatedUserEmployee);

        return res.json({
            message: "Utilisateur à jour !",
            data: { updatedUserEmployee, email: email },
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.log("Erreur lors de la mise à jour : ", error);
    }
}

/************************ UPDATE USER ADMIN ************************************/
async function updateUserAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        let { firstname, lastname, password, confirmation } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }
        //retrieve the user
        let updatedUserAdmin = await db.User.findByPk(id);
        console.log(updatedUserAdmin);
        if (!updatedUserAdmin) {
            return res.status(404).json({
                message: "L'utilisateur recherché n'existe pas",
            });
        }
        console.log(updatedUserAdmin);

        //Check if datas are valid
        if (!firstname || !lastname || !password || !confirmation) {
            return res.send("Des données sont manquantes");
        }

        //Check if password and confirmation are ok
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

        //generate email
        const email = generateEmail(firstname, lastname);

        //update
        updatedUserAdmin = await db.User.update(
            {
                ...updatedUserAdmin,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                email: email,
            },
            {
                where: { id: id, roleId: 1 },
            }
        );
        console.log("utilisateur mis a jour ", updatedUserAdmin);

        res.json({
            message: "Utilisateur à jour !",
            data: updatedUserAdmin,
            email: email,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.log("Erreur lors de la mise à jour : ", error);
    }
}

/************************ DELETE USER EMPLOYEE *********************************/
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

/************************* DELETE USER ADMIN *********************************/
async function deleteUserAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }
        const admin = await db.User.destroy({
            where: { id: id, roleId: 1 },
            force: true,
        });
        if (!admin) {
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
    createUser,
    getAllUsers,
    getUser,
    updateUserEmployee,
    deleteUserEmployee,
    updateUserAdmin,
    deleteUserAdmin,
};

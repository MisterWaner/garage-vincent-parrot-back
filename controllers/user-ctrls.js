//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import generateTemporaryPassword from "../functions/generateTemporaryPassword.js";
config();

/************ Controllers  *************/

//Creation of an admin
async function createAdmin(req, res) {
    try {
        const { email, password, confirmation, roleId = 1 } = req.body;

        //Check if datas are valid
        if (!email || !password || !confirmation) {
            return res.send("Des données sont manquantes");
        }
        if (password !== confirmation) {
            return res.status(400).json({
                message: "Les mots de passes doivent être identiques",
            });
        }
        //Check if admin already exist
        let admin = await db.User.findOne({
            where: { email: email },
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
            email: email,
            password: password,
            confirmation: confirmation,
            roleId: roleId,
        });

        await admin.save();

        return res.status(201).json({
            message: "Utilisateur créé",
            data: admin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Creation of employee
async function createEmployee(req, res) {
    try {
        const { email, lastname, firstname, services} = req.body;
        let password;
        const roleId = 2;

        console.log("Request body", req.body);
        //Check if datas are valid
        if (!email || !lastname || !firstname || !services) {
            return res.send("Des données sont manquantes");
        }
        //Check if employee already exist
        let employee = await db.User.findOne({
            where: { email: email },
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
        )

        //create employee
        employee = await db.User.create({
            email: email,
            lastname: lastname,
            firstname: firstname,
            password: hashedPassword,
            services: services,
            roleId: roleId,
        });

        return res.status(201).json({
            message: "Utilisateur créé",
            data: employee,
            password : password
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

// //login
// async function (req, res) {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.send("Données manquantes");
//         }

//         //Retrieve admin
//         let admin = await db.Admin.findOne({
//             where: { email: email },
//             raw: true,
//         });
//         if (!admin) {
//             res.status(400).json({ message: "Cette admin n'existe pas" });
//         }

//         //Check password
//         const isValid = await bcrypt.compare(password, admin.password);
//         if (!isValid) {
//             return res.status(401).json({ message: "Mot de passe invalide" });
//         }

//         return res.json({ message: "Bienvenue !", admin });
//     } catch (error) {
//         res.status(500).json("Database Error");
//         console.log(error);
//     }
// }

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

//Update User
async function updateUser(req, res) {
    try {
        const id = parseInt(req.params.id);
        let { firstname, lastname, email, password, confirmation } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the user
        let user = await db.User.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!user) {
            res.status(404).json({
                message: "L'utilisateur recherché n'existe pas",
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
        user = await db.User.update(
            {
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
                confirmation: confirmation,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Utilisateur à jour !",
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Delete User
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

export { createAdmin, createEmployee, getAllUsers, getUser, updateUser, deleteUser };

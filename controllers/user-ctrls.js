//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import generateTemporaryPassword from "../functions/generateTemporaryPassword.js";
config();

/************ Controllers  *************/

//Creation
async function createUser(req, res) {
    try {
        let { email, password, confirmation, roleId, id } = req.body;
        let hashedPassword;
        let newUser;
        //Check if datas are valids
        if (roleId === 1) {
            if (!email || !password || !confirmation) {
                return res.send("Données manquantes");
            } else if (password !== confirmation) {
                return res.status(400).json({
                    message: "Les mots de passes doivent être identiques",
                });
            }

            //Check if user already exists
            newUser = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
            if (newUser) {
                return res
                    .status(409)
                    .send(`L'utilisateur ${email} existe déjà !`);
            }
            hashedPassword = await bcrypt.hash(
                password,
                parseInt(process.env.BCRYPT_SALT_ROUND)
            );
            confirmation = hashedPassword;
        } else if (roleId === 2) {
            if (!email) {
                return res.send("Données manquantes");
            }

            //Check if user already exists
            newUser = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
            if (newUser) {
                return res
                    .status(409)
                    .send(`L'utilisateur ${email} existe déjà !`);
            }

            hashedPassword = generateTemporaryPassword(64);
            confirmation = hashedPassword;

        }

        //User creation
        newUser = await db.User.create({
            id: id,
            email: email,
            password: hashedPassword,
            confirmation: confirmation,
            roleId: roleId,
        });

        if (roleId === 1) {
            await db.Admin.create({
                userId: newUser.id,
            });
        } else if (roleId === 2) {
            await db.Employee.create({
                userId: newUser.id,
            });
        }

        return res.json({
            message: "Utilisateur créé avec succès",
            data: newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
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
            res.status(404).json({ message: "Cet utilisateur n'existe pas" });
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

export { createUser, getAllUsers, getUser, updateUser, deleteUser };

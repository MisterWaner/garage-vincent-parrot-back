//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

/************ Controllers  *************/

//Creation
async function createAdmin(req, res) {
    const { email, password, confirmation, id } = req.body;
    console.log(req.body);

    try {
        //Check if datas are valids
        if (!email || !password || !confirmation) {
            return res.send("Données manquantes");
        } else if (password !== confirmation) {
            return res.status(400).json({
                message: "Les mots de passes doivent être identiques",
            });
        }

        //Check if admin already exists
        let admin = await db.Admin.findOne({
            where: { email: email },
            raw: true,
        });
        if (admin !== null) {
            return res.status(409).json(`L'admin ${email} existe déjà !`);
        }

        //Hash password
        db.Admin.beforeCreate(async (admin, options) => {
            let hashPassword = await bcrypt.hash(
                admin.password,
                parseInt(process.env.BCRYPT_SALT_ROUND)
            );
            admin.password = hashPassword;
            admin.confirmation = admin.password;
        });

        //Admin creation
        admin = await db.Admin.create({
            id: id,
            email: email,
            password: password,
            confirmation: confirmation,
        });

        return res.json({
            message: "Admin créé avec succès",
            data: admin,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

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
        const validPwd = (enteredPwd, originalPwd) => {
            return new Promise((resolve) => {
                bcrypt.compare(enteredPwd, originalPwd, (error, res) => {
                    resolve(res);
                });
            });
        };
        if (!validPwd) {
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
        const admins = await db.Admin.findAll();
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
        let admin = await db.Admin.findOne({
            where: { id: id },
            raw: true,
        });
        if (admin === null) {
            res.status(404).json({ message: "Cet admin n'existe pas" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update Admin
async function updateAdmin(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { firstname, lastname, email, password, confirmation } = req.body;

        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the admin
        let admin = await db.Admin.findOne(req.body, {
            where: { id: id },
            raw: true,
        });

        if (admin === null) {
            res.status(404).json({
                message: "L'admin recherché n'existe pas",
            });
        }

        //update
        admin = await db.Admin.update(
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
            message: "Admin à jour !",
            data: { email, firstname, lastname },
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
        const admin = await db.Admin.destroy({
            where: { id: id },
            force: true,
        });
        if (!admin) {
            return res.status(404).json({message: "L'admin recherché n'existe pas"})
        }

        res.status(200).json({message: "Cet admin a été supprimé avec succès"});
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { createAdmin, loginAdmin, getAllAdmins, getAdmin, updateAdmin, deleteAdmin };

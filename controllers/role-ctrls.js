//Import modules
import db from "../config/sequelize-config.js";

/************** Controllers ***************/

//Add Roles
async function addRole(req, res) {
    const { id, name } = req.body;

    try {
        if (!name) {
            return res.send("Des données sont manquantes !");
        }

        //Check if role exist already exist in DB.
        let role = await db.Role.findOne({
            where: { name: name },
            raw: true,
        });
        if (role) {
            return res
                .status(409)
                .send(`Ce role : ${name} est déjà répertorié`);
        }

        //Add role
        role = await db.Role.create({
            id: id,
            name: name,
        });

        return res.json({
            message: `Le role ${name} a bien été ajouté`,
            data: role,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all roles
async function getAllRoles(req, res) {
    try {
        const roles = await db.Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one role
async function getRole(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the role
        let role = await db.Role.findOne({
            where: { id: id },
            raw: true,
        });
        if (!role) {
            res.status(404).json({
                message: "Ce role n'est pas répertorié !",
            });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update role
async function updateRole(req, res) {
    const id = parseInt(req.params.id);
    let { name } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the role
        let role = await db.Role.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!role) {
            res.status(404).json({
                message: "Le role recherché n'est pas répertorié",
            });
        }

        if (!name) {
            return res.send("Des données sont manquantes !");
        }

        //update
        role = await db.Role.update(
            {
                name: name,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Role à jour !",
            data: role,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Role
async function deleteRole(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of role
        const role = await db.Role.destroy({
            where: { id: id },
            force: true,
        });
        if (!role) {
            return res
                .status(404)
                .json({ message: "Le role recherché n'est pas répertorié" });
        }

        res.status(200).json({
            message: "Ce role a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addRole, getAllRoles, getRole, updateRole, deleteRole };

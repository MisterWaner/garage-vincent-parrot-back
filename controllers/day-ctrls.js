//Import modules
import db from "../config/sequelize-config.js";

/****************** CONTROLLERS *******************/

//Add day
async function addDay(req, res) {
    const { name, isOpen, id } = req.body;

    try {
        if (!name || !isOpen) {
            return res.send("Des données sont manquantes !");
        }

        //Check if day exist already exist in DB.
        let day = await db.Day.findOne({
            where: { name: name },
            raw: true,
        });
        if (day) {
            return res
                .status(409)
                .send(`Ce jour : ${name} est déjà répertorié`);
        }

        //Add day
        day = await db.Day.create({
            id: id,
            name: name,
            isOpen: isOpen,
        });

        return res.json({
            message: `La journée ${name} a bien été ajoutée`,
            data: day,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get Days
async function getAllDays(req, res) {
    try {
        const days = await db.Day.findAll();
        res.status(200).json(days);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one Day
async function getDay(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the day
        let day = await db.Day.findOne({
            where: { id: id },
            raw: true,
        });
        if (!day) {
            res.status(404).json({
                message: "Cette journée n'est pas répertoriée !",
            });
        }
        res.status(200).json(day);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update day
async function updateDay(req, res) {
    const id = parseInt(req.params.id);
    let { name, isOpen } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the day
        let day = await db.Day.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!day) {
            res.status(404).json({
                message: "La journée recherchée n'est pas répertoriée",
            });
        }

        if (!name || !isOpen) {
            return res.send("Des données sont manquantes !");
        }

        //update
        day = await db.Day.update(
            {
                name: name,
                isOpen: isOpen
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Journée mise à jour !",
            data: day,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Day
async function deleteDay(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of day
        const day = await db.Day.destroy({
            where: { id: id },
            force: true,
        });
        if (!id) {
            return res
                .status(404)
                .json({ message: "La journée recherchée n'est pas répertoriée" });
        }

        res.status(200).json({
            message: "Cette journée a été supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addDay, getAllDays, getDay, updateDay, deleteDay };

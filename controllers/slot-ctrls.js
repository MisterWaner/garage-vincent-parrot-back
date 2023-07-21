//Import modules
import db from "../config/sequelize-config.js";

/************** Controllers *************/

//Add slot
async function addSlot(req, res) {
    const { id, name, openingHour, closingHour } = req.body;

    try {
        if ( !name || !openingHour || !closingHour) {
            return res.send("Des données sont manquantes !");
        }

        //Check if slot exist already exist in DB.
        let slot = await db.Slot.findOne({
            where: { name: name },
            raw: true,
        });
        if (slot) {
            return res
                .status(409)
                .send(`Ce créneau : ${name} est déjà répertorié`);
        }

        //Add slot
        slot = await db.Slot.create({
            id: id,
            name: name,
            openingHour: openingHour,
            closingHour: closingHour,
        });

        return res.json({
            message: `Le créneau horaire ${name} a bien été ajouté`,
            data: slot,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all slots
async function getAllSlots(req, res) {
    try {
        const slots = await db.Slot.findAll();
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one slot
async function getSlot(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the slot
        let slot = await db.Slot.findOne({
            where: { id: id },
            raw: true,
        });
        if (!slot) {
            res.status(404).json({
                message: "Cet horaire n'est pas répertorié !",
            });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update slot
async function updateSlot(req, res) {
    const id = parseInt(req.params.id);
    let { openingHour, closingHour, name } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the slot
        let slot = await db.Slot.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!slot) {
            res.status(404).json({
                message: "Le créneau recherché n'est pas répertorié",
            });
        }

        if (!openingHour || !closingHour || !name) {
            return res.send("Des données sont manquantes !");
        }

        //update
        slot = await db.Slot.update(
            {
                openingHour: openingHour,
                closingHour: closingHour,
                name: name
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Créneau à jour !",
            data: slot,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Slot
async function deleteSlot(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of slot
        const slot = await db.Slot.destroy({
            where: { id: id },
            force: true,
        });
        if (!id) {
            return res
                .status(404)
                .json({ message: "La journée recherchée n'est pas répertoriée" });
        }

        res.status(200).json({
            message: "Cet horaire a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addSlot, getAllSlots, getSlot, updateSlot, deleteSlot };

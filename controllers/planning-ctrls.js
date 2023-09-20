//Import modules
import db from "../config/sequelize-config.js";

/***************** Controllers  *****************/

/************* CREATE PLANNING ***********/
async function addPlanning(req, res) {
    try {
        //Check if all fields are filled
        const {
            id,
            day,
            morningOpeningHour,
            morningClosingHour,
            afternoonOpeningHour,
            afternoonClosingHour,
        } = req.body;

        if (
            !day ||
            !morningOpeningHour ||
            !morningClosingHour ||
            !afternoonOpeningHour ||
            !afternoonClosingHour
        ) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        const planning = await db.Planning.findByPk(id);
        if (planning) {
            return res
                .status(409)
                .json({ message: "Ce planning est déjà répertorié" });
        }

        //Add planning
        const newPlanning = await db.Planning.create({
            id: id,
            day: day,
            morningOpeningHour: morningOpeningHour,
            morningClosingHour: morningClosingHour,
            afternoonOpeningHour: afternoonOpeningHour,
            afternoonClosingHour: afternoonClosingHour,
        });

        console.log(newPlanning);

        return res.status(200).json({
            message: "Planning créé",
            data: newPlanning,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Erreur lors de la création du planning",
        });
    }
}

/************ GET ALL PLANNINGS ***********/
async function getAllPlannings(req, res) {
    try {
        const plannings = await db.Planning.findAll();
        res.status(200).json(plannings);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

/************ GET ONE PLANNING ************/
async function getOnePlanning(req, res) {
    try {
        let id = req.params.id;
        const planning = await db.Planning.findByPk(id);

        if (!planning) {
            return res
                .status(404)
                .json({ message: "Ce planning n'existe pas" });
        }

        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

/************ UPDATE PLANNING  *********/
async function updatePlanning(req, res) {
    try {
        const id = req.params.id;
        let {
            day,
            morningOpeningHour,
            morningClosingHour,
            afternoonOpeningHour,
            afternoonClosingHour,
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        let updatedPlanning = await db.Planning.findByPk(id);
        if (!updatedPlanning) {
            return res
                .status(404)
                .json({ message: "Ce planning n'existe pas" });
        }
        console.log(updatedPlanning);

        if (
            !day ||
            !morningOpeningHour ||
            !morningClosingHour ||
            !afternoonOpeningHour ||
            !afternoonClosingHour
        ) {
            return res.send("Des données sont manquantes");
        }

        //Update planning
        updatedPlanning = await db.Planning.update(
            {
                day: day,
                morningOpeningHour: morningOpeningHour,
                morningClosingHour: morningClosingHour,
                afternoonOpeningHour: afternoonOpeningHour,
                afternoonClosingHour: afternoonClosingHour,
            },
            {
                where: { id: id },
            }
        );
        console.log("Planning mis à jour", updatedPlanning);

        return res.json({
            message: "Planning mis à jour",
            data: updatedPlanning,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.log("Erreur lors de la mise à jour : ", error);
    }
}

/************ DELETE PLANNING  *********/
async function deletePlanning(req, res) {
    try {
        const id = req.params.id;
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        const planning = await db.Planning.destroy({
            where: { id: id },
            force: true,
        });
        if (!planning) {
            return res
                .status(404)
                .json({ message: "Ce planning n'existe pas" });
        }
        res.status(200).json({ message: "Planning supprimé" });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export {
    addPlanning,
    getAllPlannings,
    getOnePlanning,
    deletePlanning,
    updatePlanning,
};

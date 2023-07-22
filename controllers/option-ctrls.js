//Import modules
import db from "../config/sequelize-config.js";

/*************** Controllers ****************/

//Add option
async function addOption(req, res) {
    const { id, name, description } = req.body;

    try {
        if (!name || !description) {
            return res.send("Des données sont manquantes !");
        }

        //Check if option exist already exist in DB.
        let option = await db.Option.findOne({
            where: { name: name },
            raw: true,
        });
        if (option) {
            return res
                .status(409)
                .send(`Cette option : ${name} est déjà répertoriée`);
        }

        //Add option
        option = await db.Option.create({
            id: id,
            name: name,
            description: description,
        });

        return res.json({
            message: `L'option ${name} a bien été ajoutée`,
            data: option,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all options
async function getAllOptions(req, res) {
    try {
        const options = await db.Option.findAll();
        res.status(200).json(options);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one option
async function getOption(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the option
        let option = await db.Option.findOne({
            where: { id: id },
            raw: true,
        });
        if (!option) {
            res.status(404).json({
                message: "Cette option n'est pas répertoriée !",
            });
        }
        res.status(200).json(option);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update option
async function updateOption(req, res) {
    const id = parseInt(req.params.id);
    let { name, description } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the option
        let option = await db.Option.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!option) {
            res.status(404).json({
                message: "L'option recherchée n'est pas répertoriée",
            });
        }

        if (!name || !description) {
            return res.send("Des données sont manquantes !");
        }

        //update
        option = await db.Option.update(
            {
                name: name,
                description: description,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Option mise à jour !",
            data: option,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Option
async function deleteOption(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of option
        const option = await db.Option.destroy({
            where: { id: id },
            force: true,
        });
        if (!option) {
            return res
                .status(404)
                .json({ message: "L'option recherchée n'est pas répertoriée" });
        }

        res.status(200).json({
            message: "Cette option a été supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addOption, getAllOptions, getOption, updateOption, deleteOption };

//Import modules
import db from "../config/sequelize-config.js";


/************** Controllers ***************/

//Add image
async function addImage(req, res) {
    const { id, name, description, url } = req.body;

    try {
        const imagePath = req.file.path;

        if (!name || !description || !url) {
            return res.send("Des données sont manquantes !");
        }

        //Check if image exist already exist in DB.
        let image = await db.Image.findOne({
            where: { name: name },
            raw: true,
        });
        if (image) {
            return res
                .status(409)
                .send(`Cette image : ${name} est déjà répertoriée`);
        }

        //Add image
        image = await db.Image.create({
            id: id,
            name: name,
            description: description,
            url: imagePath,
        });

        return res.json({
            message: `L'image ${name} a bien été ajoutée`,
            data: image,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all images
async function getAllImages(req, res) {
    try {
        const images = await db.Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one image
async function getImage(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the image
        let image = await db.Image.findOne({
            where: { id: id },
            raw: true,
        });
        if (!image) {
            res.status(404).json({
                message: "Cette image n'est pas répertoriée !",
            });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update image
async function updateImage(req, res) {
    const id = parseInt(req.params.id);
    let { name, description } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the image
        let image = await db.Image.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!image) {
            res.status(404).json({
                message: "L'image recherchée n'est pas répertoriée",
            });
        }

        if (!name || !description ) {
            return res.send("Des données sont manquantes !");
        }

        //update
        image = await db.Image.update(
            {
                name: name,
                description: description,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Image à jour !",
            data: image,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Image
async function deleteImage(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of image
        const image = await db.Image.destroy({
            where: { id: id },
            force: true,
        });
        if (!image) {
            return res
                .status(404)
                .json({ message: "L'image recherchée n'est pas répertoriée" });
        }

        res.status(200).json({
            message: "Cette image a été supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addImage, getAllImages, getImage, updateImage, deleteImage };

//Import modules
import db from "../config/sequelize-config.js";

/***************** Controllers ********************/

//Add a service
async function addService(req, res) {
    const { id, name, description, phone, email } = req.body;

    try {
        if (!name || !description || !phone || !email) {
            return res.send("Des données sont manquantes !");
        }

        //Check if service already exist in DB.
        let service = await db.Service.findOne({
            where: { name: name },
            raw: true,
        });
        if (service) {
            return res
                .status(409)
                .send(`Le service ${name} est déjà répertorié`);
        }

        //Add service
        service = await db.Service.create({
            id: id,
            name: name,
            description: description,
            phone: phone,
            email: email,
        });

        return res.json({
            message: `Le service ${name} a bien été ajouté`,
            data: service,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all services
async function getAllServices(req, res) {
    try {
        const services = await db.Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one service
async function getService(req, res) {
    try {
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the service
        let service = await db.Service.findOne({
            where: { id: id },
            raw: true,
        });
        if (!service) {
            return res.status(404).json({
                message: "Ce service n'est pas répertorié !",
            });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update service
async function updateService(req, res) {
    const id = parseInt(req.params.id);
    let { name, description, phone, email } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the service
        let service = await db.Service.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!service) {
            res.status(404).json({
                message: "Le service recherché n'est pas répertorié",
            });
        }

        if (!name || !description || !phone || !email) {
            return res.send("Des données sont manquantes !");
        }

        //update
        service = await db.Service.update(
            {
                name: name,
                description: description,
                phone: phone,
                email: email,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Service mis à jour !",
            data: service,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Option
async function deleteService(req, res) {
    try {
        const id = parseInt(req.params.id);
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of service
        const service = await db.Service.destroy({
            where: { id: id },
            force: true,
        });
        if (!service) {
            return res
                .status(404)
                .json({ message: "Le service recherché n'est pas répertorié" });
        }

        res.status(200).json({
            message: "Ce service a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addService, getAllServices, getService, updateService, deleteService };

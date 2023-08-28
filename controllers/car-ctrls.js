//Import modules
import db from "../config/sequelize-config.js";

/************ Controllers  *************/

//Add car
async function addCar(req, res) {
    const {
        immat,
        brand,
        model,
        year,
        kilometers,
        price,
        motor,
        color,
        puissance,
        image,
    } = req.body;

    try {
        const imageUrl = `http://localhost:3001/uploads/cars/${req.file.filename}`;

        if (
            !immat ||
            !brand ||
            !model ||
            !year ||
            !kilometers ||
            !price ||
            !motor ||
            !color ||
            !puissance ||
            !image
        ) {
            return res.send("Des données sont manquantes !");
        }

        //Check if car is not already in DB
        let car = await db.Car.findOne({
            where: { immat: immat },
            raw: true,
        });
        if (car) {
            return res
                .status(409)
                .send(`La voiture immatriculée ${immat} est déjà répertoriée`);
        }

        //Add car
        car = await db.Car.create({
            immat: immat,
            brand: brand,
            model: model,
            year: year,
            kilometers: kilometers,
            price: price,
            motor: motor,
            color: color,
            puissance: puissance,
            image: imageUrl,
        });

        await car.save();

        return res.json({
            message: `La voiture immatriculée ${immat} a bien été ajoutée`,
            data: car,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get car
async function getCar(req, res) {
    try {
        const immat = req.params.id;

        //check if immat is ok
        if (!immat) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the car
        let car = await db.Car.findOne({
            where: { immat: immat },
            raw: true,
        });
        if (!car) {
            res.status(404).json({
                message: "Cette voiture n'est pas répertoriée !",
            });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Get all cars
async function getAllCars(req, res) {
    try {
        const cars = await db.Car.findAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Update car
async function updateCar(req, res) {
    const immatriculation = req.params.id;
    let {
        immat,
        brand,
        model,
        year,
        kilometers,
        price,
        motor,
        isSold,
        color,
        puissance,
        imagePath,
    } = req.body;

    try {
        imagePath = req.file.path;
        //Check if id is ok
        if (!immatriculation) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the admin
        let car = await db.Car.findOne(req.body, {
            where: { immat: immatriculation },
            raw: true,
        });
        if (!car) {
            res.status(404).json({
                message: "La voiture recherchée n'est pas répertoriée",
            });
        }

        if (!immat || !brand || !model || !year) {
            return res.send("Des données sont manquantes !");
        }

        //update
        car = await db.Car.update(
            {
                immat: immat,
                brand: brand,
                model: model,
                year: year,
                kilometers: kilometers,
                price: price,
                motor: motor,
                isSold: isSold,
                color: color,
                puissance: puissance,
                image: imagePath,
            },
            {
                where: { immat: immatriculation },
            }
        );

        res.json({
            message: "Voiture mise à jour !",
            data: car,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete
async function deleteCar(req, res) {
    try {
        const immat = req.params.id;
        //Check if id is OK
        if (!immat) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of car
        const car = await db.Car.destroy({
            where: { immat: immat },
            force: true,
        });
        if (!car) {
            return res.status(404).json({
                message: "La voiture recherchée n'est pas répertoriée",
            });
        }

        res.status(200).json({
            message: "Cette voiture a été supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addCar, getCar, getAllCars, updateCar, deleteCar };

//Import modules
import db from "../config/sequelize-config.js";
import generateCarRefence from "../functions/generateCarReference.js";

/************ Controllers  *************/

//Add car
async function addCar(req, res) {
    try {
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
        } = req.body;

        if (
            !immat ||
            !brand ||
            !model ||
            !year ||
            !kilometers ||
            !price ||
            !motor ||
            !color ||
            !puissance
        ) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Generate image url
        const imageUrl = `http://localhost:3001/uploads/cars/${req.file.filename}`;

        //Check if car is not already in DB
        const car = await db.Car.findOne({
            where: { immat: immat },
            raw: true,
        });

        if (car) {
            return res
                .status(409)
                .send(`La voiture immatriculée ${immat} est déjà répertoriée`);
        }

        //Generate reference
        const reference = generateCarRefence(brand, model);
        //Add car
        const newCar = await db.Car.create({
            immat: immat,
            brand: brand,
            model: model,
            year: parseInt(year),
            reference: reference,
            kilometers: parseInt(kilometers),
            price: parseInt(price),
            motor: motor,
            color: color,
            puissance: parseInt(puissance),
            image: imageUrl,
        });

        return res.status(200).json({
            message: `La voiture immatriculée ${immat} a bien été ajoutée`,
            data: newCar,
        });
    } catch (error) {
        console.error("Erreur d'ajout de la voiture : ", error);
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
        console.error(error);
    }
}

//Update car
async function updateCar(req, res) {
    const immatriculation = req.params.id;
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
    } = req.body;

    try {
        //Check if id is ok
        if (!immatriculation) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the car
        let updatedCar = await db.Car.findOne(req.body, {
            where: { immat: immatriculation },
            raw: true,
        });
        if (!updatedCar) {
            return res.status(404).json({
                message: "La voiture recherchée n'est pas répertoriée",
            });
        }

        if (
            !immat ||
            !brand ||
            !model ||
            !year ||
            !kilometers ||
            !price ||
            !motor ||
            !color ||
            !puissance
        ) {
            return res.send("Des données sont manquantes !");
        }

        //Generate reference
        const reference = generateCarRefence(brand, model);
        //update
        updatedCar = await db.Car.update(
            {
                immat: immat,
                brand: brand,
                model: model,
                reference: reference,
                year: parseInt(year),
                kilometers: parseInt(kilometers),
                price: parseInt(price),
                motor: motor,
                color: color,
                puissance: parseInt(puissance),
            },
            {
                where: { immat: immatriculation },
            }
        );

        res.json({
            message: `La voiture immatriculée ${immatriculation} a bien été modifiée`,
            data: updatedCar,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
        console.error("Erreur lors de la mise à jour : ", error);
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

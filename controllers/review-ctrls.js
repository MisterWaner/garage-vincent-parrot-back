//Import modules
import { Sequelize } from "sequelize";
import db from "../config/sequelize-config.js";

/************ Controllers *************/

//Add review
async function addReview(req, res) {
    const { id, firstname, lastname, email, title, comment, rating, isValidated } =
        req.body;

    try {
        if (!firstname || !lastname || !email || !title || !comment || !rating) {
            return res.send("Des données sont manquantes !");
        }

        //Check if review exist already exist in DB.
        const review = await db.Review.findByPk(id);
        if (review) {
            return res
                .status(409)
                .send(
                    `Ce commentaire : ${title} est déjà répertoriée (id: ${id})`
                );
        }

        //Generate date
        const generatedDate = new Date();

        //Add review
        const newReview = await db.Review.create({
            id: id,
            title: title,
            lastname: lastname,
            firstname: firstname,
            email: email,
            rating: rating,
            isValidated: isValidated,
            comment: comment,
            date: generatedDate,
        });

        console.log(newReview);

        return res.status(200).json({
            message: `Le commentaire ${title} écrit par ${firstname} ${lastname} a bien été ajouté`,
            data: newReview,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Erreur lors de la création du commentaire" });
    }
}

//Get all reviews
async function getAllReviews(req, res) {
    try {
        const reviews = await db.Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get all validated reviews
async function getAllValidatedReviews(req, res) {
    try {
        const reviews = await db.Review.findAll({
            where: { isValidated: true },
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Get one review
async function getReview(req, res) {
    try {
        const id = req.params.id;
        let review = await db.Review.findByPk(id);
        if (!review) {
            return res.status(404).json({
                message: "Ce commentaire n'est pas répertorié !",
            });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

//Update Review
async function updateReview(req, res) {
    try {
        const id = req.params.id;
        let { isValidated } = req.body;
        //retrieve the review
        let updatedReview = await db.Review.findByPk(id);
        if (!updatedReview) {
            res.status(404).json({
                message: "Le commentaire recherché n'est pas répertorié",
            });
        }
        console.log(updatedReview);

        //update
        updatedReview = await db.Review.update(
            {
                ...updatedReview,
                isValidated: true,
            },
            {
                where: { id: id },
            }
        );

        console.log("review mis à jour", updatedReview);

        res.json({
            message: "Commentaire mis à jour !",
            data: { updatedReview, isValidated: isValidated },
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Review
async function deleteReview(req, res) {
    try {
        const id = req.params.id;
        //Check if id is OK
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //deletation of review
        const review = await db.Review.destroy({
            where: { id: id },
            force: true,
        });
        if (!review) {
            return res.status(404).json({
                message: "Le commentaire recherché n'est pas répertorié",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addReview, getAllReviews, getAllValidatedReviews, getReview, updateReview, deleteReview };

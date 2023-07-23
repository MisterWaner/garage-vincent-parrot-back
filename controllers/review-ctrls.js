//Import modules
import { Sequelize } from "sequelize";
import db from "../config/sequelize-config.js";

/************ Controllers *************/

//Add review
async function addReview(req, res) {
    const { id, author, title, text, date } = req.body;

    try {
        if (!author || !title || !text || !date) {
            return res.send("Des données sont manquantes !");
        }

        //Check if review exist already exist in DB.
        let review = await db.Review.findOne({
            where: { title: title, author: author },
            raw: true,
        });
        if (review) {
            return res
                .status(409)
                .send(
                    `Ce commentaire : ${title} écrit par ${author} est déjà répertoriée`
                );
        }

        //Add review
        review = await db.Review.create({
            id: id,
            title: title,
            author: author,
            text: text,
            date: date,
        });

        return res.json({
            message: `Le commentaire ${title} écrit par ${author} a bien été ajouté`,
            data: review,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création" });
    }
}

//Get all reviews
async function getAllReviews(req, res) {
    try {
        const reviews = await db.Review.findAll({
            attributes: {
                include: [
                    "id",
                    "title",
                    "author",
                    "text",
                    [
                        Sequelize.fn(
                            "DATE_FORMAT",
                            Sequelize.col("date"),
                            "%d-%m-%Y"
                        ),
                        "date",
                    ],
                ],
            },
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
        const id = parseInt(req.params.id);

        //check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //Retrieve the review
        let review = await db.Review.findOne({
            attributes: {
                include: [
                    "id",
                    "title",
                    "author",
                    "text",
                    [
                        Sequelize.fn(
                            "DATE_FORMAT",
                            Sequelize.col("date"),
                            "%d-%m-%Y"
                        ),
                        "date",
                    ],
                ],
            },
            where: { id: id },
            raw: true,
        });
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
    const id = parseInt(req.params.id);
    let { title, author, text, date } = req.body;

    try {
        //Check if id is ok
        if (!id) {
            return res.status(400).json({ message: "Paramètre manquant" });
        }

        //retrieve the review
        let review = await db.Review.findOne(req.body, {
            where: { id: id },
            raw: true,
        });
        if (!review) {
            res.status(404).json({
                message: "Le commentaire recherché n'est pas répertorié",
            });
        }

        if (!title || !author || !text || !date) {
            return res.send("Des données sont manquantes !");
        }

        //update
        review = await db.Review.update(
            {
                title: title,
                author: author,
                text: text,
                date: date,
            },
            {
                where: { id: id },
            }
        );

        res.json({
            message: "Commentaire mis à jour !",
            data: review,
        });
    } catch (error) {
        res.status(500).json("Database Error");
        console.log(error);
    }
}

//Delete Review
async function deleteReview(req, res) {
    try {
        const id = parseInt(req.params.id);
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

        res.status(200).json({
            message: "Ce commentaire a été supprimé avec succès",
        });
    } catch (error) {
        res.status(500).json({ message: "Database Error" });
        console.log(error);
    }
}

export { addReview, getAllReviews, getReview, updateReview, deleteReview };

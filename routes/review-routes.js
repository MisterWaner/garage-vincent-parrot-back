//Import modules
import { Router } from "express";
import {
    addReview,
    getAllReviews,
    getAllValidatedReviews,
    getReview,
    updateReview,
    deleteReview,
} from "../controllers/review-ctrls.js";

const reviewRouter = Router();

reviewRouter.post("/", addReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/validated", getAllValidatedReviews);
reviewRouter.get("/:id", getReview);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;

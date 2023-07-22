//Import modules
import { Router } from "express";
import {
    addImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage,
} from "../controllers/image-ctrls.js";

const imageRouter = Router();

imageRouter.post("/add", addImage);
imageRouter.get("/", getAllImages);
imageRouter.get("/:id", getImage);
imageRouter.put("/:id", updateImage);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;

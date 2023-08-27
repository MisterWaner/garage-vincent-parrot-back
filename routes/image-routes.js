//Import modules
import { Router } from "express";
import {
    addImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage,
} from "../controllers/image-ctrls.js";
import upload from "../middleware/multerMiddleware.js";

const imageRouter = Router();

imageRouter.post("/add", upload.single("image"), addImage);
imageRouter.get("/", getAllImages);
imageRouter.get("/:id", getImage);
imageRouter.put("/:id", updateImage);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;

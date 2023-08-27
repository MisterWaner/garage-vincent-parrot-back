//Import modules
import { Router } from "express";
import {
    addCar,
    getCar,
    getAllCars,
    updateCar,
    deleteCar,
} from "../controllers/car-ctrls.js";
import upload from "../middleware/multerMiddleware.js";

const carRouter = Router();

carRouter.post("/add", upload.single("image"), addCar);
carRouter.get("/", getAllCars);
carRouter.get("/:id", getCar);
carRouter.put("/:id", upload.single("image"), updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;

//Import modules

//Create router for car

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

carRouter.post("/", upload.single("image"), addCar);
carRouter.get("/", getAllCars);
carRouter.get("/:id", getCar);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;

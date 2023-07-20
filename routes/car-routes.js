//Import modules
import { Router } from "express";
import { addCar, getCar, getAllCars, updateCar, deleteCar } from "../controllers/car-ctrls.js";

const carRouter = Router();

carRouter.post('/add', addCar);
carRouter.get('/', getAllCars);
carRouter.get('/:id', getCar);
carRouter.put('/:id', updateCar);
carRouter.delete('/:id', deleteCar);


export default carRouter;
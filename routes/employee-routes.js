//Import modules
import { Router } from "express";
import {
    getAllEmployees,
    getEmployee,
    loginEmployee,
} from "../controllers/employee-ctrls.js";

const employeeRouter = Router();

employeeRouter.get('/', getAllEmployees);
employeeRouter.get('/:id', getEmployee);
employeeRouter.post('/login', loginEmployee);



export default employeeRouter;


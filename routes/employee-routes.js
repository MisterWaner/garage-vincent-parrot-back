//Import modules
import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployee,
    loginEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employee-ctrls.js";

const employeeRouter = Router();

employeeRouter.get('/', getAllEmployees);
employeeRouter.get('/:id', getEmployee);
employeeRouter.post('/creation', createEmployee);
employeeRouter.post('/login', loginEmployee);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter;


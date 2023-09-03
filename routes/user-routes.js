//Import modules
import { Router } from "express";
import {
    createEmployee,
    createAdmin,
    getAllUsers,
    getUser,
    updateUserEmployee,
    deleteUserEmployee,
} from "../controllers/user-ctrls.js";

const userRouter = Router();

userRouter.post("/admins", createAdmin);
userRouter.post("/employees", createEmployee);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/employees/:id", updateUserEmployee);
userRouter.delete("/employees/:id", deleteUserEmployee);

export default userRouter;

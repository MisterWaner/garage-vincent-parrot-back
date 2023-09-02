//Import modules
import { Router } from "express";
import {
    createEmployee,
    createAdmin,
    getAllUsers,
    getUser,
    updateUserEmployee,
    deleteUser,
} from "../controllers/user-ctrls.js";

const userRouter = Router();

userRouter.post("/admins", createAdmin);
userRouter.post("/employees", createEmployee);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUserEmployee);
userRouter.delete("/:id", deleteUser);

export default userRouter;

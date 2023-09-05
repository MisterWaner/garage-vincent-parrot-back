//Import modules
import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    updateUserEmployee,
    deleteUserEmployee,
    updateUserAdmin,
    deleteUserAdmin
} from "../controllers/user-ctrls.js";

const userRouter = Router();

userRouter.post("/admins", createUser);
userRouter.post("/employees", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/employees/:id", updateUserEmployee);
userRouter.put("/admins/:id", updateUserAdmin);
userRouter.delete("/employees/:id", deleteUserEmployee);
userRouter.delete("/admins/:id", deleteUserAdmin);

export default userRouter;

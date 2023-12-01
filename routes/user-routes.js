//Create router for user
import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    updatePassword,
} from "../controllers/user-ctrls.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.put("/:id/reset-password", updatePassword);
userRouter.delete("/:id", deleteUser);


export default userRouter;

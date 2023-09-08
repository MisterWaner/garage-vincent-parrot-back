//Import modules
import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
} from "../controllers/user-ctrls.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);


export default userRouter;

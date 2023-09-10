import { Router } from "express";
import { login } from "../controllers/auth-ctrls.js";

const authRouter = Router();

authRouter.post("/", login);

export default authRouter;
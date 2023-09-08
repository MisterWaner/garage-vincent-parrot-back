import { Router } from "express";
import { login } from "../controllers/login-ctrls.js";

const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;
//Import modules
import { Router } from "express";
import {
    loginAdmin,
    getAllAdmins,
    getAdmin,
} from "../controllers/admin-ctrls.js";

const adminRouter = Router();

adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;

//Import modules
import { Router } from "express";
import {
    createAdmin,
    loginAdmin,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
} from "../controllers/admin-ctrls.js";

const adminRouter = Router();

adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdmin);
adminRouter.post("/creation", createAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);

export default adminRouter;

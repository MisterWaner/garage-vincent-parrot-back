//Import modules
import { Router } from "express";
import {
    createRole,
    deleteRole,
    getAllRoles,
    getRole,
    updateRole,
} from "../controllers/role-ctrls.js";

const roleRouter = Router();

roleRouter.post("/add", createRole);
roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;

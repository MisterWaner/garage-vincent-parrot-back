//Import modules
import { Router } from "express";
import {
    addService,
    getAllServices,
    getService,
    updateService,
    deleteService,
} from "../controllers/service-ctrls.js";

const serviceRouter = Router();

serviceRouter.post("/add", addService);
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getService);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;

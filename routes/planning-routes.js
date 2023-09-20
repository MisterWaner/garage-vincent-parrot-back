//import modules
import { Router } from "express";
import { addPlanning, getAllPlannings, getOnePlanning, deletePlanning, updatePlanning } from "../controllers/planning-ctrls.js";

const planningRouter = Router();

planningRouter.post("/", addPlanning);
planningRouter.get("/", getAllPlannings);
planningRouter.get("/:id", getOnePlanning);
planningRouter.put("/:id", updatePlanning);
planningRouter.delete("/:id", deletePlanning);

export default planningRouter;
//Import modules
import { Router } from "express";
import { addDay, getDay, getAllDays, updateDay, deleteDay } from "../controllers/day-ctrls.js";

const dayRouter = Router();

dayRouter.post("/add", addDay);
dayRouter.get("/", getAllDays);
dayRouter.get("/:id", getDay);
dayRouter.put("/:id", updateDay);
dayRouter.delete("/:id", deleteDay);

export default dayRouter;

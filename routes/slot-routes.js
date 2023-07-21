//Import modules
import { Router } from "express";
import {
    addSlot,
    getAllSlots,
    getSlot,
    updateSlot,
    deleteSlot,
} from "../controllers/slot-ctrls.js";

const slotRouter = Router();

slotRouter.post("/add", addSlot);
slotRouter.get("/", getAllSlots);
slotRouter.get("/:id", getSlot);
slotRouter.put("/:id", updateSlot);
slotRouter.delete("/:id", deleteSlot);

export default slotRouter;

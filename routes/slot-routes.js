//Import modules
import { Router } from "express";
import {addSlot} from "../controllers/slot-ctrls.js";

const slotRouter = Router();

slotRouter.post("/add", addSlot);

export default slotRouter;
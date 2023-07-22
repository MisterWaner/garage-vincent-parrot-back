//Import modules
import { Router } from "express";
import {
    addOption,
    getAllOptions,
    getOption,
    updateOption,
    deleteOption,
} from "../controllers/option-ctrls.js";

const optionRouter = Router();

optionRouter.post("/add", addOption);
optionRouter.get("/", getAllOptions);
optionRouter.get("/:id", getOption);
optionRouter.put("/:id", updateOption);
optionRouter.delete("/:id", deleteOption);

export default optionRouter;

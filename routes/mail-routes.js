//import modules

//create router for mail
import { Router } from "express";
import {
    addMail,
    getAllMails,
    getOneMail,
    updateMail,
    deleteMail,
} from "../controllers/mail-ctrls.js";

const mailRouter = Router();

mailRouter.post("/", addMail);
mailRouter.get("/", getAllMails);
mailRouter.get("/:id", getOneMail);
mailRouter.put("/:id", updateMail);
mailRouter.delete("/:id", deleteMail);

export default mailRouter;

//Import modules
import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";
import {config} from "dotenv";

config();

/************ Controllers  *************/

async function createAdmin(req, res) {
    const {email, password, confirmation} = req.body;
    
}
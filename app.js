/********************** Import modules *********************/
import express from "express";
import { config } from "dotenv";

config();
const app = express();




/************************* Routes ************************/
app.get("/api", (req, res) => {
    res.send("API en ligne et fonctionnelle")
});


/*************************** Start Server *************************/
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
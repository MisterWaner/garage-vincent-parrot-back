/********************** Import modules *********************/
import express from "express";
import { config } from "dotenv";
import db from "./config/sequelize-config.js";

config();
const app = express();

/************************* Middlewares ************************/
app.use(express.json())

/************************* Routes ************************/

//Import Routers
import adminRouter from "./routes/admin-routes.js";
import employeeRouter from "./routes/employee-routes.js";
import carRouter from "./routes/car-routes.js";

app.get("/api", (req, res) => {
    res.send("API en ligne et fonctionnelle");
});

//Routes
app.use("/api/admins", adminRouter);
app.use("/api/employees", employeeRouter);
app.use('/api/cars', carRouter);

/*************************** Start Server *************************/

db.sequelize
    .authenticate()
    .then(() => console.log("DB is connected"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => console.log("error occured :", err));

/********************** Import modules *********************/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import { config } from "dotenv";
import db from "./config/sequelize-config.js";

config();
const app = express();

/************************* Middlewares ************************/
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders:
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(
    cookieParser({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders:
            "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    })
);
app.use(methodOverride("_method"))
/************************* Routes ************************/

//Import Routers
import adminRouter from "./routes/admin-routes.js";
import employeeRouter from "./routes/employee-routes.js";
import carRouter from "./routes/car-routes.js";
import dayRouter from "./routes/day-routes.js";
import slotRouter from "./routes/slot-routes.js";
import imageRouter from "./routes/image-routes.js";
import optionRouter from "./routes/option-routes.js";
import reviewRouter from "./routes/review-routes.js";
import serviceRouter from "./routes/service-routes.js";
import roleRouter from "./routes/role-routes.js";


app.get("/api", (req, res) => {
    res.send("API en ligne et fonctionnelle");
});

//Routes
app.use("/api/admins", adminRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/cars", carRouter);
app.use("/api/days", dayRouter);
app.use("/api/slots", slotRouter);
app.use("/api/images", imageRouter);
app.use("/api/options", optionRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/services", serviceRouter);
app.use("/api/roles", roleRouter);

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

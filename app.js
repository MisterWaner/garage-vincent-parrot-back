/********************** Import modules *********************/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import { config } from "dotenv";
import db from "./config/sequelize-config.js";
import {dirname} from "path";
import {fileURLToPath} from "url";

config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use('/uploads', express.static(`${__dirname}/uploads`));
/************************* Routes ************************/

//Import Routers
import carRouter from "./routes/car-routes.js";
import planningRouter from "./routes/planning-routes.js";
import reviewRouter from "./routes/review-routes.js";
import userRouter from "./routes/user-routes.js";
import authRouter from "./routes/auth-routes.js";
import mailRouter from "./routes/mail-routes.js";


app.get("/api", (req, res) => {
    res.send("API en ligne et fonctionnelle");
});

//Routes
app.use("/api/cars", carRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/login", authRouter);
app.use("/api/mails", mailRouter);
app.use("/api/plannings", planningRouter);

/*************************** Start Server *************************/

db.sequelize
    .authenticate()
    .then(() => console.log("DB is connected"))
    .then(() => {
        app.listen(process.env.SERVER_PORT || 3001, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT || 3001}`);
        });
    })
    .catch((err) => console.log("error occured :", err));

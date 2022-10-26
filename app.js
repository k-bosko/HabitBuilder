import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import indexRouter from "./routes/index.js";
import habitsRouter from "./routes/habits.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //parse form data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/myhabits", habitsRouter);
app.use("/", indexRouter);

export default app;
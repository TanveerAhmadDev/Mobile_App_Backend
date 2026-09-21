import express from "express";
import dotenv from "dotenv";

import userRouter from "../routes/user.routes.js";
import dbConnection from "../utils/dbConnection.js";
import errorHandler from "../middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import router from "../routes/request.routes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.get("/", (req, res) => {
  res.json({ message: "Hey There" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/request", router);

app.use(errorHandler);

await dbConnection();

export default app;

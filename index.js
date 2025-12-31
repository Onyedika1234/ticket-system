import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import { globalRateLimit } from "./utils/rateLimit.js";
import { errorHandling } from "./utils/errorHandling.js";
import authRouter from "./routes/auth.route.js";
import studentRoute from "./routes/students.route.js";
import userRoute from "./routes/user.route.js";
import paymentRoute from "./routes/payment.route.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(globalRateLimit);

app.use(errorHandling);

app.use("/v1/auth", authRouter);

app.use("/v1/students", studentRoute);

app.use("/v1/user", userRoute);

app.use("/v1/payments", paymentRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { globalRateLimit } from "./utils/rateLimit.js";
import { errorHandling } from "./utils/errorHandling.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(globalRateLimit);

app.use(errorHandling);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));

import { Router } from "express";
import { validateSignUp } from "../middlewares/validate.middleware.js";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);

import { Router } from "express";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validate.middleware.js";
import prisma from "../utils/prisma.js";
import { login, signUp, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);

authRouter.post("/login", validateLogin, login);

authRouter.post("/logout", logout);

export default authRouter;

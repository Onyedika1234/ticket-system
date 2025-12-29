import { Router } from "express";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validate.middleware.js";
import { login, signUp, logout } from "../controllers/auth.controller.js";
import { authRateLimit } from "../utils/rateLimit.js";

const authRouter = Router();

authRouter.use(authRateLimit);

authRouter.post("/signup", validateSignUp, signUp);

authRouter.post("/login", validateLogin, login);

authRouter.post("/logout", logout);

export default authRouter;

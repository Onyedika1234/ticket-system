import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getProfile, updateRole } from "../controllers/user.controller.js";
import { validateRole } from "../middlewares/validate.middleware.js";
import prisma from "../utils/prisma.js";

const userRoute = Router();

userRoute.get("/profile", authorize, getProfile);

userRoute.patch("/update_role", authorize, validateRole, updateRole);

export default userRoute;

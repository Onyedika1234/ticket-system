import Router from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.js";
import { createPayment } from "../controllers/payment.controller.js";
import { validatePayment } from "../middlewares/validate.middleware.js";
import prisma from "../utils/prisma.js";

const paymentRoute = Router();

paymentRoute.post(
  "/:studentId",
  authorize,
  rbac,
  validatePayment,
  createPayment
);

export default paymentRoute;

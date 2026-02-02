import { Router } from "express";
import {
  ticketAuthorization,
  authorize,
  rbac,
} from "../middlewares/auth.middleware.js";
import {
  checkTicketValidity,
  generateTicket,
} from "../controllers/ticket.controller.js";
import { validateTicketDetails } from "../middlewares/validate.middleware.js";

const ticketRoute = Router();

ticketRoute.get("/", authorize, ticketAuthorization, generateTicket);

ticketRoute.post(
  "/validate",
  authorize,
  rbac,
  validateTicketDetails,
  checkTicketValidity,
);
export default ticketRoute;

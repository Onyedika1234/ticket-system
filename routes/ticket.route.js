import { Router } from "express";
import {
  ticketAuthorization,
  authorize,
} from "../middlewares/auth.middleware.js";
import { generateTicket } from "../controllers/ticket.controller.js";

const ticketRoute = Router();

ticketRoute.get("/", authorize, ticketAuthorization, generateTicket);

export default ticketRoute;

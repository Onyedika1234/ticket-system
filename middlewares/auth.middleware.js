import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma.js";
import { isAfter } from "date-fns";
dotenv.config();

// Authentication Middleware
export const authorize = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      const err = new Error("Unauthorized: No token provided");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

//Admin Role Based Access Control Middleware
export const rbac = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user.role !== "ADMIN") {
      const err = new Error("Forbidden: Admins only");
      err.statusCode = 403;
      throw err;
    }

    next();
  } catch (error) {
    next(error);
  }
};

//Ticket authroization Middleware
export const ticketAuthorization = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, accessUntil: true },
    });

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    if (isAfter(new Date(), user.accessUntil)) {
      const err = new Error("Forbidden: Payment required");
      err.statusCode = 403;
      throw err;
    }

    // if (user.paymentStatus !== "PAID") {
    //   const err = new Error("Forbidden: Payment required");
    //   err.statusCode = 403;
    //   throw err;
    // }

    if (user.role !== "USER") {
      const err = new Error("Forbidden: Users only");
      err.statusCode = 403;
      throw err;
    }

    next();
  } catch (error) {
    next(error);
  }
};

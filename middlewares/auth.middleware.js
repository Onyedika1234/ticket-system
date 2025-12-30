import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma.js";
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

import prisma from "../utils/prisma.js";
import dotenv from "dotenv";
import { isAfter } from "date-fns";
dotenv.config();

// Get user profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        department: true,
        programme: true,
        role: true,
        accessUntil: true,
      },
    });

    // const paymentStatus;

    if (!profile) {
      const err = new Error("User Profile not found");
      err.stautsCode = 404;
      throw err;
    }

    const paymentStatus = isAfter(new Date(), profile.accessUntil)
      ? "OWING"
      : "PAID";

    res
      .status(200)
      .json({ success: true, profile: { ...profile, paymentStatus } });
  } catch (error) {
    next(error);
  }
};

// Update user role to ADMIN
export const updateRole = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const adminPassword = req.adminPassword;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      const err = new Error("Invalid credentials");
      err.stautsCode = 400;
      throw err;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "ADMIN",
      },
    });

    res.status(200).json({ success: true, message: "You are now an admin" });
  } catch (error) {
    next(error);
  }
};

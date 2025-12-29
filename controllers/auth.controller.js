import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, department, programme } = req.credentials;

    const emailExist = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (emailExist) {
      const err = new Error("Email already in use");
      err.statusCode = 400;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        programme,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ success: true, message: "Account created Successfully", user });
  } catch (err) {
    next(err);
  }

  //Email Exists
  //Check name
  //Get password, salt, hash, store
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};

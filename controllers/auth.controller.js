import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Sign Up a new user
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
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        programme: true,
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
};

// Login an existing user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.logins;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, email: true },
    });

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const err = new Error("Invalid Credentials");
      err.statusCode = 400;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 168 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "User logged in Successfully" });
  } catch (error) {
    next(error);
  }
};

// Logout a user
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

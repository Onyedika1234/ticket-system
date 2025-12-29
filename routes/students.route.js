import { Router } from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.js";
import {
  getAllStudents,
  getStudent,
} from "../controllers/students.controller.js";

const studentRoute = Router();

studentRoute.get("/", authorize, rbac, getAllStudents);
studentRoute.get("/:id", authorize, rbac, getStudent);

export default studentRoute;

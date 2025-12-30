import { Router } from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.js";
import {
  deleteStudent,
  getAllStudents,
  getStudent,
} from "../controllers/students.controller.js";

const studentRoute = Router();

studentRoute.get("/", authorize, rbac, getAllStudents);

studentRoute.get("/:studentId", authorize, rbac, getStudent);

studentRoute.delete("/:studentId", authorize, rbac, deleteStudent);

export default studentRoute;

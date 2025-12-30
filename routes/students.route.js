import { Router } from "express";
import { authorize, rbac } from "../middlewares/auth.middleware.js";
import {
  deleteStudent,
  getAllStudents,
  getStudent,
} from "../controllers/students.controller.js";

const studentRoute = Router();

//Get all students
studentRoute.get("/", authorize, rbac, getAllStudents);

//Get single student
studentRoute.get("/:studentId", authorize, rbac, getStudent);

//Delete student
studentRoute.delete("/:studentId", authorize, rbac, deleteStudent);

export default studentRoute;

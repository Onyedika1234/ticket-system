import prisma from "../utils/prisma.js";
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        name: true,
        email: true,
        department: true,
        programme: true,
      },
    });

    if (!students) {
      const err = new Error("No student found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, students });
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      const err = new Error("Id of student is required");
      err.statusCode = 400;
      throw err;
    }

    const student = await prisma.user.findUnique({
      where: { id: studentId, role: "USER" },
      select: { name: true, email: true, department: true, programme: true },
    });

    if (!student) {
      const err = new Error("Student not found");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await prisma.user.findUnique({
      where: {
        id: studentId,
        role: "USER",
      },
      select: { id: true },
    });
    if (!student) {
      const err = new Error("Student not found");
      err.statusCode = 404;
      throw err;
    }

    await prisma.user.delete({ where: { id: student.id } });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

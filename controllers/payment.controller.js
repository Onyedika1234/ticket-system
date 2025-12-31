//Req.user.id takes the user id from the auth middleware and check if the user is an admin or not
//If the user is an admin, allow them to create a payment record for a student
//If the user is not an admin, return a 403 error
//The standard payments amount is taken from the .env file
//The amount paid is taken and divided by the standard amount to determine the number of months paid for
//The end date is calculated by adding the number of months paid for to the start date
//The payment record is then created in the database
import { addDays, format } from "date-fns";
import prisma from "../utils/prisma.js";
import dotenv from "dotenv";

dotenv.config();

export const createPayment = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { paymentAmount } = req;

    if (!studentId) {
      const err = new Error("Student ID is required");
      err.statusCode = 400;
      throw err;
    }

    const student = await prisma.user.findUnique({
      where: { id: parseInt(studentId) },
      select: { id: true, name: true, email: true },
    });

    if (!student) {
      const err = new Error("Student not found");
      err.statusCode = 404;
      throw err;
    }

    const standardAmount = parseFloat(process.env.FEES);

    const days = Math.round((paymentAmount / standardAmount) * 30);

    const endDate = addDays(new Date(), days);

    const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss.SSS");
    const payment = await prisma.payment.create({
      data: {
        userId: parseInt(studentId),
        amount: paymentAmount,
        startDate: new Date(),
        endDate: new Date(formattedEndDate),
        duration: days,
      },
    });
    res.status(201).json({
      message: "Payment record created successfully",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

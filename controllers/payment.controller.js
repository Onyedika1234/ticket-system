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

    console.log(paymentAmount);

    //Check if student Id is given.

    if (!studentId) {
      const err = new Error("Student ID is required");
      err.statusCode = 400;
      throw err;
    }

    //Check if student exist.
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: { id: true, name: true, email: true },
    });

    if (!student) {
      const err = new Error("Student not found");
      err.statusCode = 404;
      throw err;
    }

    //Get payment history in order to get the last payment date of a user
    const paymentHistory = await prisma.payment.findMany({
      where: { userId: studentId },
      select: { endDate: true },
    });

    // let startDate;

    //If a user has no payment history, then he is just starting his payment journey with the start date of now, instead the start date will be the day the last payment ended.

    const startDate =
      paymentHistory.length == 0 ? new Date() : paymentHistory[0].endDate;

    const standardAmount = parseFloat(process.env.FEES);

    const days = Math.round((paymentAmount / standardAmount) * 30);

    const endDate = addDays(startDate, days);

    await prisma.$transaction([
      prisma.payment.create({
        data: {
          userId: studentId,
          amount: paymentAmount,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          duration: days,
        },
      }),

      prisma.user.update({
        where: { id: studentId },
        data: { accessUntil: new Date(endDate) },
      }),
    ]);
    res.status(201).json({
      message: "Payment record created successfully",
    });
  } catch (error) {
    next(error);
  }
};

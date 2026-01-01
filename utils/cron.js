//Create a function, that looks for the last payment a user did and compare if it is expired or not, then if true, set a field in the user table payment status to owing.
import prisma from "../utils/prisma.js";
import { isBefore } from "date-fns";

export const updatePaymentStatus = async () => {
  try {
    const latestPayments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      distinct: ["userId"],
      select: {
        userId: true,
        endDate: true,
        amount: true,
      },
    });

    const today = new Date();

    let paidUserIds = [];
    let owingUserIds = [];

    paidUserIds = latestPayments
      .filter((payment) => !isBefore(new Date(payment.endDate), today))
      .map((payment) => payment.userId);

    owingUserIds = latestPayments
      .filter((payment) => isBefore(new Date(payment.endDate), today))
      .map((payment) => payment.userId);

    await prisma.$transaction([
      //Updating paid users to PAID status
      prisma.user.updateMany({
        where: { id: { in: paidUserIds } },
        data: { paymentStatus: "PAID" },
      }),
      //Updating owing users to OWING status
      prisma.user.updateMany({
        where: { id: { in: owingUserIds } },
        data: { paymentStatus: "OWING" },
      }),
    ]);
  } catch (error) {
    console.error(error);
  }
};

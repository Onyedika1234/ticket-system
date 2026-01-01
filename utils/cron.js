//Create a function, that looks for the last payment a user did and compare if it is expired or not, then if true, set a field in the user table payment status to owing.
import prisma from "../utils/prisma.js";
import { isAfter } from "date-fns";

export const updatePaymentStatus = async () => {
  try {
    const data = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      distinct: ["userId"],
      select: {
        userId: true,
        endDate: true,
      },
    });

    const today = new Date();

    //Expired
    const updatedData = data.filter((d) => isAfter(today, new Date(d.endDate)));

    const updated = updatedData.forEach(async (payment) => {
      await prisma.user.updateMany({
        where: { id: payment.userId },
        data: { paymentStatus: "OWING" },
      });
    });

    console.log(data);
    // console.log(updatedData);
    console.log(updated);
  } catch (error) {
    console.error("Error updating payment status:", error);
  }
};

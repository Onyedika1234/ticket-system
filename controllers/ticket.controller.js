import prisma from "../utils/prisma.js";
import { ticketOutput } from "../utils/dtos.js";
export const generateTicket = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const generateTicket = await prisma.ticket.create({
      data: { userId },
      include: { user: true },
    });

    const userResponse = ticketOutput(generateTicket);

    res.status(201).json({
      status: "success",
      ticket: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

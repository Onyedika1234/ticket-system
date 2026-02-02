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

export const checkTicketValidity = async (req, res, next) => {
  try {
    const { ticketId } = req.ticketId;

    const ticketExist = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: { id: true, user: true },
    });

    if (!ticketExist) {
      const err = Error("Ticket not found");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ success: true, ticket: ticketExist });
  } catch (error) {
    next(error);
  }
};

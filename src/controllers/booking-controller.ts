import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const  userId  = req.userId || 577;

  try {
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const  userId  = req.userId || 577;
  const  { roomId }  = req.body;

  try {
    const booking = await bookingService.postBooking(Number(userId), Number(roomId));

    return res.status(httpStatus.OK).json({ bookingId: booking?.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    console.log(error.message);
    if (error.name === "fullCapacity") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}


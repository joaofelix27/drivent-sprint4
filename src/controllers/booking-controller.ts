import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const  userId  = req.userId || 576;

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

// export async function getbookingWithRooms(req: AuthenticatedRequest, res: Response) {
//   const { userId } = req;
//   const { hotelId } = req.params;

//   try {
//     const hotels = await hotelService.getHotelsWithRooms(Number(userId), Number(hotelId));

//     return res.status(httpStatus.OK).send(hotels);
//   } catch (error) {
//     if (error.name === "NotFoundError") {
//       return res.sendStatus(httpStatus.NOT_FOUND);
//     }
//     if (error.name === "CannotListHotelsError") {
//       return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
//     }
//     return res.sendStatus(httpStatus.BAD_REQUEST);
//   }
// }

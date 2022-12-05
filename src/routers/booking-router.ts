import { Router } from "express";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { getBooking, postBooking, updateBooking } from "@/controllers";
import { createBookingSchema, updateBookingSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createBookingSchema), postBooking)
  .put("/:bookingId", validateBody(createBookingSchema), validateParams(updateBookingSchema), updateBooking);

export { bookingRouter };

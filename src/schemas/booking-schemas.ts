import Joi from "joi";

export const createBookingSchema = Joi.object({
  roomId: Joi.number().greater(0).required()
});

export const updateBookingSchema = Joi.object({
  bookingId: Joi.number().greater(0).required()
});


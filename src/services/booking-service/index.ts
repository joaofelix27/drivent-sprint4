import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";

async function getBooking(userId: number) {
  //Tem reserva para esse userId?
  const bookingExists = await bookingRepository.findBookingByUserId(userId);
  if (!bookingExists) {
    throw notFoundError();
  }
  //Acha a reserva e formata
  const booking = await bookingRepository.getBooking(userId);

  return booking;
}

// async function listHotels(userId: number) {
//   //Tem enrollment?
//   const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
//   if (!enrollment) {
//     throw notFoundError();
//   }
//   //Tem ticket pago isOnline false e includesHotel true
//   const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

//   if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
//     throw cannotListHotelsError();
//   }
// }

// async function getHotels(userId: number) {
//   await listHotels(userId);

//   const hotels = await hotelRepository.findHotels();
//   return hotels;
// }

// async function getHotelsWithRooms(userId: number, hotelId: number) {
//   await listHotels(userId);
//   const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

//   if (!hotel) {
//     throw notFoundError();
//   }
//   return hotel;
// }

const bookingService = {
  getBooking
};

export default bookingService;

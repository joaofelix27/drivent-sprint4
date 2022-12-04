import bookingRepository from "@/repositories/booking-repository";
import hotelsService from "@/services/hotels-service";
import roomsRepository from "@/repositories/rooms-repository";
import { notFoundError } from "@/errors";

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

async function postBooking(userId: number, roomId: number) {
  await hotelsService.listHotels(userId);
  //Tem o quarto?
  const room = await roomsRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  // Ainda tem vaga?
  const bookingsByRoomId = await bookingRepository.getBookingsByRoomId(roomId);

  const bookingsLength = bookingsByRoomId?.length;

  const roomCurrentCapacity = room?.capacity - bookingsLength;

  // Lembrar de colocar que se já tiver um booking com o userId não fazer nada

  console.log(roomCurrentCapacity);

  if (!roomCurrentCapacity) {
    throw { name: "fullCapacity", message: "The room has reach full capacity" };
  }

  return await bookingRepository.bookRoom(roomId, userId);
}

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
  getBooking,
  postBooking
};

export default bookingService;

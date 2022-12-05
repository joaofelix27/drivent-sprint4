import bookingRepository from "@/repositories/booking-repository";
import hotelsService from "@/services/hotels-service";
import roomsRepository from "@/repositories/rooms-repository";
import { conflictError, notFoundError } from "@/errors";
import { Room } from "@prisma/client";

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
  const room = await checkIfRoomExists(roomId);

  //Checa se já tem uma reserva feita por esse usuário
  const bookingByUserId = await bookingRepository.getBookingByUserId(userId);

  if(bookingByUserId) {
    throw { name: "Forbidden", message: "Already exists booking" }; //403
  }
  // Ainda tem vaga?
 
  await checkCapacity (roomId, room);

  return await bookingRepository.bookRoom(roomId, userId);
}

// O room id do booking atual tem que ser diferente do que vem para ser modificadp
async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const bookingById = await bookingRepository.getBookingById(bookingId);

  if(!bookingById) {
    throw { name: "Forbidden", message: "No booking found" }; //403
  }
  //Tem o quarto?
  const room = await checkIfRoomExists(roomId);

  // Ainda tem vaga?
 
  await checkCapacity (roomId, room);

  await bookingRepository.updateBooking(roomId, userId);

  return bookingById;
}

async function checkCapacity(roomId: number, room: Room) {
  const bookingsByRoomId = await bookingRepository.getBookingsByRoomId(roomId);

  const bookingsLength = bookingsByRoomId?.length;

  const roomCurrentCapacity = room?.capacity - bookingsLength;

  if (!roomCurrentCapacity) {
    throw { name: "Forbidden", message: "The room has reach full capacity" };
  }
}

async function checkIfRoomExists(roomId: number) {
  const room = await roomsRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError(); //404
  }
  return room;
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking
};

export default bookingService;

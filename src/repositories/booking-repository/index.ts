import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    }
  });
}

async function getBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true
    }
  });
}

async function bookRoom(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId
    }
  });
}
const bookingRepository = {
  findBookingByUserId,
  getBooking,
  getBookingsByRoomId,
  bookRoom
};

export default bookingRepository;

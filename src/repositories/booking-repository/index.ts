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

async function getBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    }
  });
}

async function getBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
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

async function updateBooking(roomId: number, userId: number) {
  return prisma.booking.updateMany({
    where: {
      userId
    },
    data: {
      roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  getBooking,
  getBookingsByRoomId,
  bookRoom,
  getBookingByUserId,
  getBookingById,
  updateBooking
};

export default bookingRepository;

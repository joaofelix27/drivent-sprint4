import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
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

const bookingRepository = {
  findBookingByUserId,
  getBooking,
};

export default bookingRepository;

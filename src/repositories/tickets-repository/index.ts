import { prisma } from "@/config";

async function findWithTypes() {
  return prisma.ticketType.findMany();
}

async function findTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: { Enrollment: { userId } },
    include: { TicketType: true },
  });
}

async function createNewTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketWithId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: { select: { userId: true } }, TicketType: { select: { price: true } } },
  });
}

async function setPaidTicket(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: "PAID" }
  });
}

const ticketsRepository = {
  findWithTypes,
  findTicket,
  createNewTicket,
  findTicketWithId,
  setPaidTicket
};

export default ticketsRepository;

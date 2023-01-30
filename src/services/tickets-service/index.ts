import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentsService from "../enrollments-service";

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.findWithTypes();
  if (!ticketTypes) return [];
  return ticketTypes;
}

async function getTicket(userId: number) {
  const ticket = await ticketsRepository.findTicket(userId);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function insertTicket(userId: number, ticketTypeId: number) {
  const enrollment= await enrollmentsService.getOneWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  const newTicket = await ticketsRepository.createNewTicket(enrollment.id, ticketTypeId);
  return newTicket;
}

const ticketsService = { getTicketTypes, getTicket, insertTicket };

export default ticketsService;

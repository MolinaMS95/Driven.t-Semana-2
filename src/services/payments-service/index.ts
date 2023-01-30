import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentInfo } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPaymentWithId(ticketId: number, userId: number) {
  if(!ticketId) throw { name: "BadRequestError" };

  const ticket = await ticketsRepository.findTicketWithId(ticketId);
  if(!ticket) throw notFoundError();
  if(ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.findPayment(ticketId);
  return payment;
}

async function setPayment(paymentInfo: PaymentInfo, userId: number) {
  const ticket = await ticketsRepository.findTicketWithId(paymentInfo.ticketId);
  if(!ticket) throw notFoundError();
  if(ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const newPayment = await paymentsRepository.insertPayment(paymentInfo, ticket.TicketType.price);
  await ticketsRepository.setPaidTicket(paymentInfo.ticketId);
  return newPayment;
}

const paymentsService = { getPaymentWithId, setPayment };

export default paymentsService;

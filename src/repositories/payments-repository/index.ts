import { prisma } from "@/config";
import { PaymentInfo } from "@/protocols";

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function insertPayment(paymentInfo: PaymentInfo, value: number) {
  return prisma.payment.create({
    data: {
      ticketId: paymentInfo.ticketId,
      value: value,
      cardIssuer: paymentInfo.cardData.issuer,
      cardLastDigits: paymentInfo.cardData.number.toString().slice(-4),
    }
  });
}

const paymentsRepository = {
  findPayment,
  insertPayment
};

export default paymentsRepository;

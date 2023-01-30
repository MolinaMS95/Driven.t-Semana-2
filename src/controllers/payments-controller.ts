import { AuthenticatedRequest } from "@/middlewares";
import { PaymentInfo } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  try {
    const payment = await paymentsService.getPaymentWithId(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentInfo = req.body as PaymentInfo;

  try {
    const newPayment = await paymentsService.setPayment(paymentInfo, userId);

    return res.status(httpStatus.OK).send(newPayment);
  } catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

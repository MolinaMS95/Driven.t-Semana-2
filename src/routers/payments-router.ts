import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment, createPayment } from "@/controllers";
import { paymentSchema } from "@/schemas/payments-schema";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(paymentSchema), createPayment);

export { paymentsRouter };

import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketTypes, getTicket, createTicket } from "@/controllers";
import { ticketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicket)
  .post("/", validateBody(ticketSchema), createTicket);

export { ticketsRouter };

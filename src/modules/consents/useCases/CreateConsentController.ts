import { Request, Response } from "express";
import { CreateConsentUseCase } from "./CreateConsentUseCase";
import { prisma } from "../../../prisma/client";

export class CreateConsentController {
  async handle(req: Request, res: Response) {
    const {
      loggedUser,
      businessEntity,
      permissions,
      expirationDateTime,
      transactionFromDateTime,
      transactionToDateTime,
    } = req.body;

    const createConsentUseCase = new CreateConsentUseCase();

    await createConsentUseCase.execute({
      loggedUser,
      businessEntity,
      permissions,
      expirationDateTime,
      transactionFromDateTime,
      transactionToDateTime,
    });

    return res.status(201).send();
  }
}

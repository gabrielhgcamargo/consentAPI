import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { CreateConsentDTO } from "../dtos/CreateConsentDTO";
import { v4 as uuidv4 } from "uuid";
import { CreateConsentUseCase } from "./CreateConsentUseCase";

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

    const consent = await prisma.consent.findFirst({
      where: {
        loggedUser,
        businessEntity,
        expirationDateTime,
        transactionFromDateTime,
        transactionToDateTime,
      },
    });

    if (!consent) {
      return res.status(404).send({ message: "CPF/CPNJ not found!" });
    }

    return res.status(201).send({
      data: consent,
      links: {
        self: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
        first:
          "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
        prev: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
        next: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
        last: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      },
      meta: {
        totalPages: 1,
        totalRecords: 1,
        requestDateTime: "2022-11-08T05:21:04.926Z",
      },
    });
  }
}

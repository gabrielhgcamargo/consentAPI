import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { GetAllConsentUseCase } from "./GetAllConsentUseCase";

export class GetAllConsentController {
  async handle(req: Request, res: Response) {
    const getAllConsentUseCase = new GetAllConsentUseCase();

    const result = await getAllConsentUseCase.execute();

    if (result.length == 0) {
      return res
        .status(404)
        .send({ message: "There are no registered consents." });
    }
    return res.status(201).send(result);
  }
}

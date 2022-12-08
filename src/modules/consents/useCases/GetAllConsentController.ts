import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { GetAllConsentUseCase } from "./GetAllConsentUseCase";

export class GetAllConsentController {
  async handle(req: Request, res: Response) {
    const getAllConsentUseCase = new GetAllConsentUseCase();

    const result = await getAllConsentUseCase.execute();

    return res.status(201).send(result);
  }
}

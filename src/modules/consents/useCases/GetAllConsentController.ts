import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { GetAllConsentUseCase } from "./GetAllConsentUseCase";

export class GetAllConsentController {
  async handle(req: Request, res: Response) {
    const getConsentByIdUseCase = new GetAllConsentUseCase();

    const result = await getConsentByIdUseCase.execute();

    return res.status(200).json(result);
  }
}

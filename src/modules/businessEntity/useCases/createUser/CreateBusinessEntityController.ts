import { Request, Response } from "express";
import { CreateBusinesEntityUseCase } from "./CreateBusinesEntityUseCase";

export class CreateBusinessEntityController {
  async handle(req: Request, res: Response) {
    const { CNPJ, name } = req.body;

    const createBusinesEntityUseCase = new CreateBusinesEntityUseCase();

    const result = await createBusinesEntityUseCase.execute({ CNPJ, name });

    if (result == "businessEntityAlreadyExists") {
      return res.status(400).send({ message: "CNPJ already registered." });
    }

    return res.status(201).json(result);
  }
}

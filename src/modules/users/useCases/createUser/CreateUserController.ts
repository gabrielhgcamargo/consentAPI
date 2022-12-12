import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { CPF, name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      CPF,
      name,
      email,
      password,
    });

    if (result == "cpfAlredyRegistered") {
      return res.status(400).send({ message: "CPF already registered." });
    }

    if (result == "emailAlredyRegistered") {
      return res.status(400).send({ message: "Email already registered." });
    }

    if (result == "cpfNotValid") {
      return res.status(400).send({ message: "CPF not valid." });
    }

    return res.status(201).send({
      CPF: result.CPF,
      name: result.name,
      email: result.email,
    });
  }
}

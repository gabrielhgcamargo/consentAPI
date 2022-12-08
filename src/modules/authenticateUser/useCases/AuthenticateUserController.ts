import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

import { decode } from "jsonwebtoken";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    if (token == "userOrPasswordIncorrect") {
      return response
        .status(401)
        .send({ message: "Unauthorized! Incorrect email or password." });
    }

    return response.json(token);
  }
}

export { AuthenticateUserController };

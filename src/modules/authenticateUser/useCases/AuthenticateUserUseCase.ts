import { prisma } from "../../../prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      if (!userAlreadyExists) {
        return "userOrPasswordIncorrect";
      }
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      return "userOrPasswordIncorrect";
    }

    const token = sign({}, "corinthiansbiggerthanflamengo", {
      subject: userAlreadyExists.CPF,
      expiresIn: "10h",
    });

    return { token };
  }
}

export { AuthenticateUserUseCase };

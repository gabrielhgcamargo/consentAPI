import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  async execute({ CPF, name, email, password }: CreateUserDTO) {
    // Verify if USER already exists

    const cpfAlredyRegistered = await prisma.user.findUnique({
      where: {
        CPF,
      },
    });

    if (cpfAlredyRegistered) {
      return "cpfAlredyRegistered";
    }

    const emailAlredyRegistered = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlredyRegistered) {
      return "emailAlredyRegistered";
    }

    const passwordHash = await hash(password, 8);

    //Create User
    const user = await prisma.user.create({
      data: {
        CPF,
        name,
        email,
        password: passwordHash,
      },
    });

    return user;
  }
}

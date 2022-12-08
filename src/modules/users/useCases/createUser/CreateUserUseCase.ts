import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateUserUseCase {
  async execute({ CPF, name, email, password }: CreateUserDTO): Promise<User> {
    // Verify if USER already exists
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //Create User
    const user = await prisma.user.create({
      data: {
        CPF,
        name,
        email,
        password,
      },
    });

    return user;
  }
}

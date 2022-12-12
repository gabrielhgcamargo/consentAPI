import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  async execute({ CPF, name, email, password }: CreateUserDTO) {
    if (!isValidCPF(CPF)) {
      return "cpfNotValid";
    }

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

function isValidCPF(cpf: any) {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split("").map((el: string | number) => +el);
  const rest = (count: number) =>
    ((cpf
      .slice(0, count - 12)
      .reduce(
        (soma: number, el: number, index: number) =>
          soma + el * (count - index),
        0
      ) *
      10) %
      11) %
    10;
  return rest(10) === cpf[9] && rest(11) === cpf[10];
}

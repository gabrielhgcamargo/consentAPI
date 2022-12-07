import { Consent } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";
import { CreateConsentDTO } from "../dtos/CreateConsentDTO";

export class CreateConsentUseCase {
  async execute({
    loggedUser,
    businessEntity,
    permissions,
    expirationDateTime,
    transactionFromDateTime,
    transactionToDateTime,
  }: CreateConsentDTO) {
    //verify if CPF exists
    // const cpfExists = await prisma.user.findUnique({
    //   where: {
    //     CPF: loggedUser.CPF,
    //   },
    // });

    // if (!cpfExists) {
    //   throw new AppError("CPF not registered!");
    // }

    // verify if CNPF exists
    // const cnpjExists = await prisma.businessEntity.findUnique({
    //   where: {
    //     CNPJ: businessEntity.CNPJ,
    //   },
    // });

    // if (!cnpjExists) {
    //   throw new AppError("CNPJ not registered!");
    // }

    // create consent
    await prisma.consent.create({
      data: {
        loggedUser: {
          create: {
            CPF: loggedUser.CPF,
            name: loggedUser.name,
            email: loggedUser.email,
            password: loggedUser.password,
          },
        },
        businessEntity: {
          create: {
            CNPJ: businessEntity.CNPJ,
            name: businessEntity.name,
          },
        },
        permissions: {
          create: {
            productName: permissions.productName,
          },
        },
        expirationDateTime,
        transactionFromDateTime,
        transactionToDateTime,
      },
    });
  }
}

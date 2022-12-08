import { Consent } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";
import { CreateConsentDTO } from "../dtos/CreateConsentDTO";
import { v4 as uuidv4 } from "uuid";

export class CreateConsentUseCase {
  async execute({
    loggedUser,
    businessEntity,
    permissions,
    expirationDateTime,
    transactionFromDateTime,
    transactionToDateTime,
  }: CreateConsentDTO) {
    // verify if CPF exists
    const cpfExists = await prisma.user.findUnique({
      where: {
        CPF: loggedUser.CPF,
      },
    });

    if (!cpfExists) {
      throw new AppError("CPF not registered!");
    }

    // verify if CNPF exists
    const cnpjExists = await prisma.businessEntity.findUnique({
      where: {
        CNPJ: businessEntity.CNPJ,
      },
    });

    if (!cnpjExists) {
      throw new AppError("CNPJ not registered!");
    }

    const prefix = "urn:mapfre:";
    const result = uuidv4();
    const completeId = prefix + result;
    console.log(completeId);

    // create consent
    await prisma.consent.create({
      data: {
        consentId: completeId,
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

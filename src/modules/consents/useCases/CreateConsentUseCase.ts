import { Consent } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateConsentDTO } from "../dtos/CreateConsentDTO";
import { v4 as uuidv4 } from "uuid";
const {
  authenticatedUser,
} = require("../../authenticateUser/useCases/AuthenticateUserController");

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
      return "cpfDoesNotExists";
    }

    // verify if CNPF exists
    const cnpjExists = await prisma.businessEntity.findUnique({
      where: {
        CNPJ: businessEntity.CNPJ,
      },
    });

    if (!cnpjExists) {
      return "cnpjDoesNotExists";
    }

    const prefix = "urn:mapfre:";
    const result = uuidv4();
    const completeId = prefix + result;

    try {
      // create consent
      await prisma.consent.create({
        data: {
          consentId: completeId,
          loggedUser: {
            connect: {
              CPF: cpfExists.CPF,
            },
          },
          businessEntity: {
            connect: {
              CNPJ: cnpjExists.CNPJ,
            },
          },
          permissions,
          expirationDateTime,
          transactionFromDateTime,
          transactionToDateTime,
        },
      });
    } catch (error) {
      return "DataTypeNotProvided";
    }
  }
}

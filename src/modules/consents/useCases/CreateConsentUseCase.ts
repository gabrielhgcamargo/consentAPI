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
        transactionToDateTime}: CreateConsentDTO ){

            /*
            //verify if CPF exists
            const cpfExists = await prisma.user.findUnique({
                where: {
                    CPF,
                }
            });

            if(!cpfExists) {
                throw new AppError("CPF not registered!");
            }

            // verify if CNPF exists
            const cnpjExists = await prisma.businessEntity.findUnique({
                where: {
                    CNPJ,
                }
            });

            if(!cnpjExists) {
                throw new AppError("CNPJ not registered!");
            }

            */
           
            // create consent
            await prisma.consent.create({
                data: {
                    identification: loggedUser,
                    identification_: businessEntity,
                    permissions,
                    expirationDateTime,
                    transactionFromDateTime,
                    transactionToDateTime
                },
              });
        }
}
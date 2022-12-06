import { BusinessEntity, User } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateBusinessEntityDTO } from "../../dtos/CreateBusinessEntityDTO";

export class CreateBusinesEntityUseCase {
    async execute({CNPJ, name}: CreateBusinessEntityDTO): Promise<BusinessEntity> {

    // Verify if USER already exists
    const businessEntityAlreadyExists = await prisma.businessEntity.findUnique({
        where: {
          CNPJ,
        },
      });
  
      if (businessEntityAlreadyExists) {
        throw new AppError("BusninessEntity already exists!");
      }
    
    //Create User
    const businessEntity = await prisma.businessEntity.create({
        data: {
            CNPJ, 
            name
        }
    })


    return businessEntity;
    }
}
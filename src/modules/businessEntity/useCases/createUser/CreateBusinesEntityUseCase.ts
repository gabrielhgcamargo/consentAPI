import { BusinessEntity, User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateBusinessEntityDTO } from "../../dtos/CreateBusinessEntityDTO";

export class CreateBusinesEntityUseCase {
  async execute({ CNPJ, name }: CreateBusinessEntityDTO) {
    // Verify if USER already exists
    const businessEntityAlreadyExists = await prisma.businessEntity.findUnique({
      where: {
        CNPJ,
      },
    });

    if (businessEntityAlreadyExists) {
      return "businessEntityAlreadyExists";
    }

    //Create User
    const businessEntity = await prisma.businessEntity.create({
      data: {
        CNPJ,
        name,
      },
    });

    return businessEntity;
  }
}

import { BusinessEntity, User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateBusinessEntityDTO } from "../../dtos/CreateBusinessEntityDTO";

export class CreateBusinesEntityUseCase {
  async execute({
    CNPJ,
    name,
  }: CreateBusinessEntityDTO): Promise<BusinessEntity> {
    // Verify if USER already exists
    const businessEntityAlreadyExists = await prisma.businessEntity.findUnique({
      where: {
        CNPJ,
      },
    });

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

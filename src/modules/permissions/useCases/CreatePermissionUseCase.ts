import { prisma } from "../../../prisma/client";
import { CreatePermissionDTO } from "../dtos/CreatePermissionDTO";

export class CreatePermissionUseCase {
  async execute({ productName }: CreatePermissionDTO) {
    // create permission
    await prisma.permissions.create({
      data: {
        productName,
      },
    });
  }
}

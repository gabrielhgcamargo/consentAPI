import { Router } from "express";
import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { CreateConsentController } from "../modules/consents/useCases/CreateConsentController";
import { GetAllConsentController } from "../modules/consents/useCases/GetAllConsentController";
import { prisma } from "../prisma/client";

const createConsentController = new CreateConsentController();
const getAllConsentController = new GetAllConsentController();

const consentRoutes = Router();

consentRoutes.post("/", createConsentController.handle);
consentRoutes.get("/", getAllConsentController.handle);

consentRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const consent = await prisma.consent.findFirst({
    where: { consentId: String(id) },
    include: {
      permissions: {
        select: {
          productName: true,
        },
      },
    },
  });

  if (!consent) {
    throw new AppError("Consent not found!");
  }

  res.status(200).json(consent);
});

consentRoutes.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, permissions } = req.body;

  const consent = await prisma.consent.update({
    where: { consentId: id },
    data: {
      status: status,
      permissions: permissions.productName,
    },
    include: {
      permissions: {
        select: {
          productName: true,
        },
      },
    },
  });

  if (!consent) {
    throw new AppError("Consent not found!");
  }
  res.status(200).json(consent);
});

export { consentRoutes };

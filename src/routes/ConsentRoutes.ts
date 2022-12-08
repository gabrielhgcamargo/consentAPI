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
    return res.status(404).send({ message: "Consent not found!" });
  }

  return res.status(200).send({
    data: consent,
    links: {
      self: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      first:
        "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      prev: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      next: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      last: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
    },
    meta: {
      totalPages: 1,
      totalRecords: 1,
      requestDateTime: "2022-11-08T05:21:04.926Z",
    },
  });
});

consentRoutes.put("/:id", async (req: Request, res: Response) => {
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
    return res.status(404).send({ message: "Consent not found!" });
  }

  return res.status(200).send({
    data: consent,
    links: {
      self: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      first:
        "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      prev: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      next: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
      last: "https://65pwcy7ng5.execute-api.us-east-1.amazonaws.com//open-insurance/consents/v1",
    },
    meta: {
      totalPages: 1,
      totalRecords: 1,
      requestDateTime: "2022-11-08T05:21:04.926Z",
    },
  });
});

export { consentRoutes };

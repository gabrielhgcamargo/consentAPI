import { Router } from "express";
import { Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedDocument } from "../middlewares/ensureAuthenticatedDocument";
import { ensureAuthenticatedCreate } from "../middlewares/ensureAuthenticatedCreate";
import { CreateConsentController } from "../modules/consents/useCases/CreateConsentController";
import { GetAllConsentController } from "../modules/consents/useCases/GetAllConsentController";
import { prisma } from "../prisma/client";

const createConsentController = new CreateConsentController();
const getAllConsentController = new GetAllConsentController();

const consentRoutes = Router();

// POST A CONSENT
consentRoutes.post(
  "/",
  ensureAuthenticatedCreate,
  createConsentController.handle
);

// GET ALL CONSENTS
consentRoutes.get("/", getAllConsentController.handle);

// GET CONSENT BY ID
consentRoutes.get(
  "/:id",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const consent = await prisma.consent.findFirst({
      where: { consentId: String(id) },
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
  }
);

// GET CONSENT BY DOCUMENT
consentRoutes.get(
  "/document/:document",
  ensureAuthenticatedDocument,
  async (req: Request, res: Response) => {
    const { document } = req.params;
    const consent = await prisma.consent.findMany({
      where: { userCPF: String(document) },
    });

    // HERE

    console.log(typeof consent);
    console.log(consent);

    if (!consent) {
      return res
        .status(404)
        .send({ message: "Consent not found with this document!" });
    }

    return res.status(200).send({
      data: consent,
    });
  }
);

// CHANGE STATUS AND PERMISSIONS
consentRoutes.put(
  "/:id",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, permissions } = req.body;

    const verifyIfExists = await prisma.consent.findFirst({
      where: { consentId: String(id) },
    });

    if (!verifyIfExists) {
      return res.status(404).send({ message: "Consent not found!" });
    }

    const consent = await prisma.consent.update({
      where: { consentId: id },
      data: {
        status: status,
        permissions: permissions,
      },
    });

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
  }
);

// DELETE A CONSENT
consentRoutes.delete(
  "/:id",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const test = await prisma.consent.findFirst({
      where: { consentId: String(id) },
    });

    if (!test) {
      return res.status(404).send({ message: "Consent not found!" });
    }
    const consent = await prisma.consent.delete({
      where: { consentId: String(id) },
    });

    return res.status(200).send({
      message: "Consent with the ID = " + id + " deleted with success.",
    });
  }
);

export { consentRoutes };

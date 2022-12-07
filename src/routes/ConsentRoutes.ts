import { Router } from "express";
import { CreateConsentController } from "../modules/consents/useCases/CreateConsentController";
import { GetAllConsentController } from "../modules/consents/useCases/GetAllConsentController";

const createConsentController = new CreateConsentController();
const getConsentByIdController = new GetAllConsentController();

const consentRoutes = Router();

consentRoutes.post("/", createConsentController.handle);
consentRoutes.get("/", getConsentByIdController.handle);

export { consentRoutes };

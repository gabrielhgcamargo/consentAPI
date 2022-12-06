import { Router } from "express";
import { CreateConsentController } from "../modules/consents/useCases/CreateConsentController";

const createConsentController = new CreateConsentController();


const consentRoutes = Router();

consentRoutes.post("/", createConsentController.handle);

export { consentRoutes };
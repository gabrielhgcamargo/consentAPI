import { Router } from "express";
import { CreateBusinessEntityController } from "../modules/businessEntity/useCases/createUser/CreateBusinessEntityController";

const createBusinessEntityController = new CreateBusinessEntityController();

const businessEntityRoutes = Router();

businessEntityRoutes.post("/", createBusinessEntityController.handle);

export { businessEntityRoutes };

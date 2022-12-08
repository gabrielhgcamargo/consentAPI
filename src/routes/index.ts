import { Router } from "express";
import { businessEntityRoutes } from "./BusinessEntityRoutes";
import { consentRoutes } from "./ConsentRoutes";
import { userRoutes } from "./UserRoutes";

const routes = Router();

routes.use("/open-insurance/users/v1", userRoutes);
routes.use("/open-insurance/businessEntity/v1", businessEntityRoutes);
routes.use("/open-insurance/consents/v1", consentRoutes);

export { routes };

import { Router } from "express";
import { businessEntityRoutes } from "./BusinessEntityRoutes";
import { consentRoutes } from "./ConsentRoutes";
import { userRoutes } from "./UserRoutes";

const routes = Router();
const prefix = "/open-insurance";

routes.use(prefix + "/users/v1", userRoutes);
routes.use(prefix + "/businessEntity/v1", businessEntityRoutes);
routes.use(prefix + "/consents/v1", consentRoutes);

export { routes };

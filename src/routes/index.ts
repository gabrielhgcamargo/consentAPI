import { Router } from "express";
import { businessEntityRoutes } from "./BusinessEntityRoutes";
import { consentRoutes } from "./ConsentRoutes";
import { permissionRoutes } from "./PermissionRoutes";
import { userRoutes } from "./UserRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/businessEntity", businessEntityRoutes);
routes.use("/consent", consentRoutes);
routes.use("/permission", permissionRoutes);

export { routes };

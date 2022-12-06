import { Router } from "express";
import { CreatePermissionController } from "../modules/permissions/useCases/CreatePermissionController";


const createPermissionController = new CreatePermissionController();


const permissionRoutes = Router();

permissionRoutes.post("/", createPermissionController.handle);

export { permissionRoutes };
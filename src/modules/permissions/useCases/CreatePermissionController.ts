import { Request, Response } from "express";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

export class CreatePermissionController {
    async handle(req: Request, res: Response){
        const { productName} = req.body;

        const createPermissionUseCase = new CreatePermissionUseCase();

        await createPermissionUseCase.execute({productName});

        return res.status(201).send();
    }
}
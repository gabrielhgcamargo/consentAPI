import express, { NextFunction, Request, request, Response } from "express";
import { routes } from "./routes";
import 'express-async-errors'
import { AppError } from "./errors/AppError";

const app = express();
app.use(express.json());

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }
  
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  );

app.listen(8000, () => console.log("Server online on port 8000"));
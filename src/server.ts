import express, { NextFunction, Request, request, Response } from "express";
import { routes } from "./routes";
import "express-async-errors";

const app = express();
app.use(express.json());

app.use(routes);

app.listen(8000, () => console.log("Server online on port 8000"));

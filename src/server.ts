import express from "express";
import { routes } from "./routes";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
//import swaggerDocs from "./swagger.json";

const app = express();
app.use(express.json());

app.use(routes);
// app.use(
//   "/open-insurance/v1/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocs)
// );

app.listen(8000, () => console.log("Server online on port 8000"));

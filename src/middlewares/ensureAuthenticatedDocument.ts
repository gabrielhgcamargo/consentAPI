import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { prisma } from "../prisma/client";

export async function ensureAuthenticatedDocument(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  const userCpf = request.params;
  const documentParam = userCpf["document"];

  console.log(userCpf);

  const cpfExists = await prisma.user.findFirst({
    where: {
      CPF: documentParam,
    },
  });

  if (!authToken) {
    return response.status(401).send({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  const decodeJwt = decode(token);

  if (decodeJwt) {
    if (cpfExists) {
      if (cpfExists.CPF != decodeJwt["sub"]) {
        return response.status(401).send({
          message:
            "Authenticated but the document " +
            documentParam +
            " is not yours. You can just make requisitions to your own document.",
        });
      }
    }
  }

  try {
    verify(token, "corinthiansbiggerthanflamengo");
    return next();
  } catch (err) {
    return response.status(401).send({
      message: "Invalid Token.",
    });
  }
}

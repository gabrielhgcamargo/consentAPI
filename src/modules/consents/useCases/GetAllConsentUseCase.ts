import { Consent } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class GetAllConsentUseCase {
  async execute(): Promise<Consent[]> {
    const consent = await prisma.consent.findMany({});

    return consent;
  }
}

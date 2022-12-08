-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "consentConsentId" TEXT NOT NULL,
    CONSTRAINT "permissions_consentConsentId_fkey" FOREIGN KEY ("consentConsentId") REFERENCES "consent" ("consentId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_permissions" ("consentConsentId", "id", "productName") SELECT "consentConsentId", "id", "productName" FROM "permissions";
DROP TABLE "permissions";
ALTER TABLE "new_permissions" RENAME TO "permissions";
CREATE TABLE "new_consent" (
    "consentId" TEXT NOT NULL PRIMARY KEY,
    "creationDateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_AUTHORISATION',
    "statusUpdateDateTime" DATETIME NOT NULL,
    "expirationDateTime" DATETIME NOT NULL,
    "transactionFromDateTime" DATETIME NOT NULL,
    "transactionToDateTime" DATETIME NOT NULL,
    "userCPF" TEXT NOT NULL,
    "businessEntityCNPJ" TEXT NOT NULL,
    CONSTRAINT "consent_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "users" ("CPF") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "consent_businessEntityCNPJ_fkey" FOREIGN KEY ("businessEntityCNPJ") REFERENCES "businessEntities" ("CNPJ") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_consent" ("businessEntityCNPJ", "consentId", "creationDateTime", "expirationDateTime", "status", "statusUpdateDateTime", "transactionFromDateTime", "transactionToDateTime", "userCPF") SELECT "businessEntityCNPJ", "consentId", "creationDateTime", "expirationDateTime", "status", "statusUpdateDateTime", "transactionFromDateTime", "transactionToDateTime", "userCPF" FROM "consent";
DROP TABLE "consent";
ALTER TABLE "new_consent" RENAME TO "consent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

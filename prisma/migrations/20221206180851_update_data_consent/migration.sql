/*
  Warnings:

  - You are about to drop the `_DataToPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DataToPermissions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "data";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "consent" (
    "consentId" TEXT NOT NULL PRIMARY KEY,
    "creationDateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_AUTHORISATION',
    "statusUpdateDateTime" DATETIME NOT NULL,
    "identification" TEXT NOT NULL,
    "identification_" TEXT NOT NULL,
    "expirationDateTime" DATETIME NOT NULL,
    "transactionFromDateTime" DATETIME NOT NULL,
    "transactionToDateTime" DATETIME NOT NULL,
    CONSTRAINT "consent_identification_fkey" FOREIGN KEY ("identification") REFERENCES "users" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consent_identification__fkey" FOREIGN KEY ("identification_") REFERENCES "businessEntities" ("CNPJ") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ConsentToPermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ConsentToPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "consent" ("consentId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ConsentToPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "permissions" ("productName") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "consent_consentId_key" ON "consent"("consentId");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsentToPermissions_AB_unique" ON "_ConsentToPermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsentToPermissions_B_index" ON "_ConsentToPermissions"("B");

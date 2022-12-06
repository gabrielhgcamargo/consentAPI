/*
  Warnings:

  - The primary key for the `data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `data` table. All the data in the column will be lost.
  - The required column `consentId` was added to the `data` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `expirationDateTime` to the `data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification` to the `data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_` to the `data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionFromDateTime` to the `data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionToDateTime` to the `data` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "CPF" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "businessEntities" (
    "CNPJ" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "permissions" (
    "productName" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_DataToPermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DataToPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "data" ("consentId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DataToPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "permissions" ("productName") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_data" (
    "consentId" TEXT NOT NULL PRIMARY KEY,
    "creationDateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_AUTHORISATION',
    "statusUpdateDateTime" DATETIME NOT NULL,
    "identification" TEXT NOT NULL,
    "identification_" TEXT NOT NULL,
    "expirationDateTime" DATETIME NOT NULL,
    "transactionFromDateTime" DATETIME NOT NULL,
    "transactionToDateTime" DATETIME NOT NULL,
    CONSTRAINT "data_identification_fkey" FOREIGN KEY ("identification") REFERENCES "users" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "data_identification__fkey" FOREIGN KEY ("identification_") REFERENCES "businessEntities" ("CNPJ") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_data" ("creationDateTime", "status", "statusUpdateDateTime") SELECT "creationDateTime", "status", "statusUpdateDateTime" FROM "data";
DROP TABLE "data";
ALTER TABLE "new_data" RENAME TO "data";
CREATE UNIQUE INDEX "data_consentId_key" ON "data"("consentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "businessEntities_CNPJ_key" ON "businessEntities"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "businessEntities_email_key" ON "businessEntities"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_productName_key" ON "permissions"("productName");

-- CreateIndex
CREATE UNIQUE INDEX "_DataToPermissions_AB_unique" ON "_DataToPermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_DataToPermissions_B_index" ON "_DataToPermissions"("B");

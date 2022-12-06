/*
  Warnings:

  - You are about to drop the column `email` on the `businessEntities` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_businessEntities" (
    "CNPJ" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_businessEntities" ("CNPJ", "name") SELECT "CNPJ", "name" FROM "businessEntities";
DROP TABLE "businessEntities";
ALTER TABLE "new_businessEntities" RENAME TO "businessEntities";
CREATE UNIQUE INDEX "businessEntities_CNPJ_key" ON "businessEntities"("CNPJ");
CREATE TABLE "new_users" (
    "CPF" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_users" ("CPF", "email", "name") SELECT "CPF", "email", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

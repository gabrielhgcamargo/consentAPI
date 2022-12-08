/*
  Warnings:

  - You are about to drop the column `totalRecords` on the `meta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalPages" INTEGER NOT NULL,
    "requestDateTime" TEXT NOT NULL
);
INSERT INTO "new_meta" ("id", "requestDateTime", "totalPages") SELECT "id", "requestDateTime", "totalPages" FROM "meta";
DROP TABLE "meta";
ALTER TABLE "new_meta" RENAME TO "meta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

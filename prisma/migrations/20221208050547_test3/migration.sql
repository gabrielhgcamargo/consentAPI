/*
  Warnings:

  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "links";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "meta";
PRAGMA foreign_keys=on;

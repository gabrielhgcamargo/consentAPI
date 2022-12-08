-- CreateTable
CREATE TABLE "users" (
    "CPF" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "businessEntities" (
    "CNPJ" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "consentConsentId" TEXT NOT NULL,
    CONSTRAINT "permissions_consentConsentId_fkey" FOREIGN KEY ("consentConsentId") REFERENCES "consent" ("consentId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "consent" (
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

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "refreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("CPF") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "businessEntities_CNPJ_key" ON "businessEntities"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_userId_key" ON "refreshToken"("userId");

-- CreateTable
CREATE TABLE "users" (
    "CPF" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("CPF")
);

-- CreateTable
CREATE TABLE "businessEntities" (
    "CNPJ" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "businessEntities_pkey" PRIMARY KEY ("CNPJ")
);

-- CreateTable
CREATE TABLE "consent" (
    "consentId" TEXT NOT NULL,
    "creationDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_AUTHORISATION',
    "statusUpdateDateTime" TIMESTAMP(3) NOT NULL,
    "permissions" TEXT[],
    "expirationDateTime" TIMESTAMP(3) NOT NULL,
    "transactionFromDateTime" TIMESTAMP(3) NOT NULL,
    "transactionToDateTime" TIMESTAMP(3) NOT NULL,
    "userCPF" TEXT NOT NULL,
    "businessEntityCNPJ" TEXT NOT NULL,

    CONSTRAINT "consent_pkey" PRIMARY KEY ("consentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "businessEntities_CNPJ_key" ON "businessEntities"("CNPJ");

-- AddForeignKey
ALTER TABLE "consent" ADD CONSTRAINT "consent_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "users"("CPF") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent" ADD CONSTRAINT "consent_businessEntityCNPJ_fkey" FOREIGN KEY ("businessEntityCNPJ") REFERENCES "businessEntities"("CNPJ") ON DELETE CASCADE ON UPDATE CASCADE;

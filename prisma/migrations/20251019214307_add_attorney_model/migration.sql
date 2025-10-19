-- CreateTable
CREATE TABLE "attorneys" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "licence_number" VARCHAR(255) NOT NULL,
    "licence_jurisdiction" VARCHAR(100) NOT NULL,
    "licence_country_code" VARCHAR(100),
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "nationality" TEXT,
    "marital_status" TEXT,
    "professional_address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attorneys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attorneys_licence_number_key" ON "attorneys"("licence_number");

-- CreateIndex
CREATE UNIQUE INDEX "attorneys_email_key" ON "attorneys"("email");

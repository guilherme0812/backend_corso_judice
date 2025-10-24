/*
  Warnings:

  - A unique constraint covering the columns `[officialId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "maritalStatus" VARCHAR(100),
ADD COLUMN     "officialId" VARCHAR(7),
ADD COLUMN     "officialIdIssuingBody" VARCHAR(100),
ADD COLUMN     "officialIdissuingState" VARCHAR(100),
ADD COLUMN     "profession" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "clients_officialId_key" ON "clients"("officialId");

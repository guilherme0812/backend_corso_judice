/*
  Warnings:

  - You are about to drop the column `adressCode` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `adressComplement` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `clients` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `email` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "adressCode",
DROP COLUMN "adressComplement",
DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "stateId",
ADD COLUMN     "addressComplement" TEXT,
ADD COLUMN     "addressZipCode" VARCHAR(20),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

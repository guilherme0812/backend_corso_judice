/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "document" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "createDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Client_document_key" ON "Client"("document");

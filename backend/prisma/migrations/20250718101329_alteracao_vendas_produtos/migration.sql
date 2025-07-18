/*
  Warnings:

  - You are about to drop the column `produtoId` on the `vendas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_produtoId_fkey";

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "produtoId",
ALTER COLUMN "valorTotal" DROP NOT NULL;

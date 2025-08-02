/*
  Warnings:

  - You are about to drop the column `nomeSevico` on the `servicos` table. All the data in the column will be lost.
  - Added the required column `nomeServico` to the `servicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicos" DROP COLUMN "nomeSevico",
ADD COLUMN     "nomeServico" TEXT NOT NULL;

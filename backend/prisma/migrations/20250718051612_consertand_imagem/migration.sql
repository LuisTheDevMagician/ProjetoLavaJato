/*
  Warnings:

  - You are about to drop the column `fimagem` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `imagem` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "fimagem",
ADD COLUMN     "imagem" TEXT NOT NULL;

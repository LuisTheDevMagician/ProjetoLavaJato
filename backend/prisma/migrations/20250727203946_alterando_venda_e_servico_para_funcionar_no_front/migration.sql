/*
  Warnings:

  - The `status` column on the `servicos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `vendas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "servicos" ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Status";

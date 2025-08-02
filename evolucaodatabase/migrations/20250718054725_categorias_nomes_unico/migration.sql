/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `categorias_produtos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `categorias_servicos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `categorias_veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categorias_produtos_nome_key" ON "categorias_produtos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_servicos_nome_key" ON "categorias_servicos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_veiculos_nome_key" ON "categorias_veiculos"("nome");

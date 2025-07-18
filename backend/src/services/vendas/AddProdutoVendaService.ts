import prismaClient from "../../prisma";

interface ProdutoVendaRequest {
    vendaId: number;
    produtoId: number;
    quantidade: number;
}

class AddProdutoVendaService {
    async execute({ vendaId, produtoId, quantidade }: ProdutoVendaRequest) {
        const produtoVenda = await prismaClient.produtoVenda.create({
            data: {
               vendaId: vendaId,
               produtoId: produtoId,
               quantidade: quantidade
            }
        });

        return produtoVenda;
    }
}

export { AddProdutoVendaService };

import prismaClient from "../../prisma";

interface ProdutoVenda {
    vendaId: number;
}

class DetalheVendaService {
    async execute({vendaId}: ProdutoVenda) {
        const venda = await prismaClient.produtoVenda.findMany({
            where: {
                vendaId: vendaId
            },
            include: {
                produto: true,
                venda: true,
            },
        });

        return venda;
    }
}

export { DetalheVendaService };
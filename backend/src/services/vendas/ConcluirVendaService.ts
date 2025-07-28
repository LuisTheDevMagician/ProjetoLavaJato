import prismaClient from "../../prisma";

class ConcluirVendaService {
    async execute(id: number) {
        
        const produtosVenda = await prismaClient.produtoVenda.findMany({
            where: { vendaId: id },
            include: { produto: true },
        });

        
       const valorTotal = produtosVenda.reduce((total, item) => {
       const preco = item.produto.valor.toNumber(); 
       return total + preco * item.quantidade;
       }, 0);

        
        const venda = await prismaClient.venda.update({
            where: { id },
            data: {
                status: true,
                valorTotal: valorTotal.toFixed(2), 
            },
        });

        return venda;
    }
}

export { ConcluirVendaService };

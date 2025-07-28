import prismaClient from "../../prisma";

class RemoveProdutoVenda {
    async execute(id: number) {
        const remove = await prismaClient.produtoVenda.delete({
            where: {
                id: id
            }
        });

        return remove;
    }
}

export { RemoveProdutoVenda };
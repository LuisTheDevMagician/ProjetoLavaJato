import prismaClient from "../../prisma";

interface ProdutoRequest {
    categoriaProdutoId: number;
}

class ListByCaProdutoService{
    async execute({ categoriaProdutoId }: ProdutoRequest){
        const procurarPorCategoria = await prismaClient.produto.findMany({
            where: {
                categoriaProdutoId: categoriaProdutoId
            }
        });

        return procurarPorCategoria;
    }
}

export { ListByCaProdutoService };
import prismaClient from "../../prisma";

class ListCaProdutoService {
    async execute() {
        const categorias = await prismaClient.categoriaProduto.findMany({
            select: {
                id: true,
                nome: true,
            }
        });
        return categorias;
    }
}

export { ListCaProdutoService };
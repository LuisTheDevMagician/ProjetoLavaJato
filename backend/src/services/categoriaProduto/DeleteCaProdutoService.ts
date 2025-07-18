import prismaClient from "../../prisma";

class DeleteCaProdutoService {
    async execute(nome: string) {
        const categoriaProdutoExistente = await prismaClient.categoriaProduto.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaProdutoExistente) {
            throw new Error('Categoria de produto não encontrada');
        }

        await prismaClient.categoriaProduto.delete({
            where: {
                nome: nome
            }
        });

        return {message: 'Categoria de produto deletada com sucesso'};
    }
}

export { DeleteCaProdutoService };

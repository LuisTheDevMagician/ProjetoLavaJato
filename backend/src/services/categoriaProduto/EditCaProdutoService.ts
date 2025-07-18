import prismaClient from "../../prisma";

class EditCaProdutoService {
    async execute(nome: string, novoNome: string) {
        const categoriaProdutoExistente = await prismaClient.categoriaProduto.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaProdutoExistente) {
            throw new Error('Categoria de produto não encontrada');
        }

        // Verificar se o novo nome já está em uso
        const nomeEmUso = await prismaClient.categoriaProduto.findFirst({
            where: {
                nome: novoNome
            }
        });

        if (nomeEmUso) {
            throw new Error('Nome da categoria de produto já está em uso');
        }

        const categoriaProdutoAtualizado = await prismaClient.categoriaProduto.update({
            where: {
                nome: nome
            },
            data: {
                nome: novoNome
            }
        });

        const { created_at, ...categoriaProdutoSemData } = categoriaProdutoAtualizado;

        return {message: 'Categoria de produto editada com sucesso', ...categoriaProdutoSemData};
    }
}

export { EditCaProdutoService };

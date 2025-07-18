import prismaClient from "../../prisma";

interface CategoriaProdutoRequest {
    nome: string;
}

class CreateCaProdutoService {
    async execute({ nome }: CategoriaProdutoRequest) {

        // Verificação de nome
        if (!nome) {
            throw new Error('Nome da categoria é obrigatório');
        }

        // Verificação se categoria já existe
        const categoriaJaExiste = await prismaClient.categoriaProduto.findFirst({
            where: {
                nome: nome
            }
        });

        if (categoriaJaExiste) {
            throw new Error('Categoria já cadastrada com esse nome');
        }

        // Criação da categoria
        const categoria = await prismaClient.categoriaProduto.create({
            data: {
                nome: nome
            },
            select: {
                id: true,
                nome: true
            }
        });

        return { message: 'Categoria criada com sucesso!', ...categoria };
    }
}

export { CreateCaProdutoService };
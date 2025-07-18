import prismaClient from "../../prisma";

interface UpdateServico {
    nome: string;
    novoNome?: string;
    valor?: number;
}

class EditCaServicoService {
    async execute(data: UpdateServico) {
        const { nome, novoNome, valor } = data;

        // verificando se a categoria de serviço existe
        const categoriaServicoExistente = await prismaClient.categoriaServico.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaServicoExistente) {
            throw new Error('Categoria de serviço não encontrada');
        }

        // verificando se há dados para atualizar
        if (novoNome === undefined && valor === undefined) {
            throw new Error('Nenhum dado para atualizar fornecido');
        }

        // verificando se o novo nome já está em uso (somente se estiver sendo alterado)
        if (novoNome && novoNome !== nome) {
            const nomeEmUso = await prismaClient.categoriaServico.findFirst({
                where: {
                    nome: novoNome
                }
            });

            if (nomeEmUso) {
                throw new Error('Nome da categoria de serviço já está em uso');
            }
        }

        // Atualizando a categoria de serviço
        const categoriaServicoAtualizada = await prismaClient.categoriaServico.update({
            where: {
                nome: nome
            },
            data: {
                nome: novoNome !== undefined ? novoNome : categoriaServicoExistente.nome,
                valor: valor !== undefined ? valor : categoriaServicoExistente.valor
            }
        });

        const { created_at, ...categoriaServicoSemData } = categoriaServicoAtualizada;

        return { 
            message: 'Categoria de serviço editada com sucesso', 
            ...categoriaServicoSemData 
        };
    }
}

export { EditCaServicoService };
import prismaClient from "../../prisma";

class EditCaVeiculoService {
    async execute(nome: string, novoNome: string) {
        const categoriaVeiculoExistente = await prismaClient.categoriaVeiculo.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaVeiculoExistente) {
            throw new Error('Categoria de veículo não encontrada');
        }

        // Verificar se o novo nome já está em uso
        const nomeEmUso = await prismaClient.categoriaVeiculo.findFirst({
            where: {
                nome: novoNome
            }
        });

        if (nomeEmUso) {
            throw new Error('O novo nome da categoria de veículo já está em uso');
        }

        await prismaClient.categoriaVeiculo.update({
            where: {
                nome: nome
            },
            data: {
                nome: novoNome
            }
        });

        const { created_at, ...categoriaVeiculoSemData } = categoriaVeiculoExistente;

        return {message: 'Categoria de veículo editada com sucesso', ...categoriaVeiculoSemData};
    }
}

export { EditCaVeiculoService };
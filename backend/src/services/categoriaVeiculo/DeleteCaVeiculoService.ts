import prismaClient from "../../prisma";

class DeleteCaVeiculoService {
    async execute(nome: string) {
        const categoriaVeiculoExistente = await prismaClient.categoriaVeiculo.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaVeiculoExistente) {
            throw new Error('Categoria de veículo não encontrada');
        }

        await prismaClient.categoriaVeiculo.delete({
            where: {
                nome: nome
            }
        });

        return {message: 'Categoria de veículo deletada com sucesso'};
    }
}

export { DeleteCaVeiculoService };
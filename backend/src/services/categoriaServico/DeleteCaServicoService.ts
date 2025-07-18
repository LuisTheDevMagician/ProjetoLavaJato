import prismaClient from "../../prisma";

class DeleteCaServicoService {
    async execute(nome: string) {
        const categoriaServicoExistente = await prismaClient.categoriaServico.findUnique({
            where: {
                nome: nome
            }
        });

        if (!categoriaServicoExistente) {
            throw new Error('Categoria de serviço não encontrada');
        }

        await prismaClient.categoriaServico.delete({
            where: {
                nome: nome
            }
        });

        return {message: 'Categoria de serviço deletada com sucesso'};
    }
}

export { DeleteCaServicoService };
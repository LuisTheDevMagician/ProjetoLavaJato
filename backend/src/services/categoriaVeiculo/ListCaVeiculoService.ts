import prismaClient from "../../prisma";

class ListCaVeiculoService {
    async execute() {
        const categorias = await prismaClient.categoriaVeiculo.findMany({
            select: {
                id: true,
                nome: true,
            }
        });
        return categorias;
    }
}

export { ListCaVeiculoService };
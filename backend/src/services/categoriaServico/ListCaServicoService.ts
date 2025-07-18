import prismaClient from "../../prisma";

class ListCaServicoService {
    async execute() {
        const categoriasServico = await prismaClient.categoriaServico.findMany({
            select: {
                id: true,
                nome: true,
                valor: true
            }
        });

        return categoriasServico;
    }
}

export { ListCaServicoService };
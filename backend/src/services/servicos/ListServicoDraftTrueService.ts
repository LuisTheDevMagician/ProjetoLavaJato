import prismaClient from "../../prisma";

class ListServicoDraftTrueService {
    async execute() {
        const servicos = await prismaClient.servico.findMany({
            where: {
                draft: true
            }
        });

        return servicos;
    }
}

export { ListServicoDraftTrueService };

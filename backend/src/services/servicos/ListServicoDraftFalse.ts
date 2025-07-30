import prismaClient from "../../prisma";

class ListServicoDraftFalseService {
    async execute() {
        const servicos = await prismaClient.servico.findMany({
            where: {
                draft: false
            }
        });

        return servicos;
    }
}

export { ListServicoDraftFalseService };

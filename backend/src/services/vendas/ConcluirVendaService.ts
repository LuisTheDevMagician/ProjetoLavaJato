import prismaClient from "../../prisma";

class ConcluirVendaService {
    async execute(id: number) {
        const venda = await prismaClient.venda.update({
            where: {
                id: id
            },
            data: {
                status: true
            }
        });

        return venda;
    }
}

export { ConcluirVendaService };
import prismaClient from "../../prisma";

class SendVendaService {
    async execute(id: number) {
        const venda = await prismaClient.venda.update({
            where: {
                id: id
            },
            data: {
                draft: false,
            },
        });

        return venda;
    }
}

export { SendVendaService };
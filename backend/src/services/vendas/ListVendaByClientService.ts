import prismaClient from "../../prisma";

interface VendaRequest {
    clienteId: number;
}

class ListVendaByClientService {
    async execute({ clienteId }: VendaRequest) {
        const vendas = await prismaClient.venda.findMany({
            where: {
                clienteId: clienteId
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return vendas;
    }
}

export { ListVendaByClientService };
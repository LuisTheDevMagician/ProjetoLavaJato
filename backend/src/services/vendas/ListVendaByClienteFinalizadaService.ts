import prismaClient from "../../prisma";

interface VendaRequest {
    clienteId: number;
}

class ListVendaByClienteFinalizadaService {
    async execute({ clienteId }: VendaRequest) {
        const vendas = await prismaClient.venda.findMany({
            where: {
                clienteId: clienteId,
                status: true
            },         
            orderBy: {
                created_at: 'desc'
            }
        });

        return vendas;
    }
}

export { ListVendaByClienteFinalizadaService };
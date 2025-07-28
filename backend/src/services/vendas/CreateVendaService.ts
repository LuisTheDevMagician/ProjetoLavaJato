import prismaClient from "../../prisma";

interface VendaRequest {
    valorTotal?: number;
    clienteId: number;
}

class CreateVendaService {
    async execute({ valorTotal, clienteId }: VendaRequest) {
        
        const cliente = await prismaClient.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });

        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        
        const venda = await prismaClient.venda.create({
            data: {
                valorTotal: valorTotal || 0,
                clienteId: cliente.id,
            },
        });

        return venda;
    }
}


export { CreateVendaService };
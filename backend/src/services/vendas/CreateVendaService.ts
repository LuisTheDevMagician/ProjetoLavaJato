import prismaClient from "../../prisma";

interface VendaRequest {
    valorTotal?: number;
    clienteId: number;
}

class CreateVendaService {
    async execute({ valorTotal, clienteId }: VendaRequest) {
        // Verifica se o cliente existe
        const cliente = await prismaClient.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });

        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        // Cria a venda
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
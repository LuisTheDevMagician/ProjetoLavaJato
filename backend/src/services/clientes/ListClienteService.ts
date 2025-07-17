import prismaClient from "../../prisma";

class ListClienteService {
    async execute() {
        const clientes = await prismaClient.cliente.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                rua: true,
                bairro: true,
                numero: true,
            }
        });
        return clientes;
    }
}

export { ListClienteService };
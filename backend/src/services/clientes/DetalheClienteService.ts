import prismaClient from "../../prisma";

class DetalheClienteService {
    async execute(user_id: string) {

        const cliente = await prismaClient.cliente.findFirst({
            where: {
                id: Number(user_id)
            },
            select: {
                id: true,
                nome: true,
                email: true,
                funcao: true
            }
        });


        return cliente;
    }
}

export { DetalheClienteService };
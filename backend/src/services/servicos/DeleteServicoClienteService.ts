import prismaClient from "../../prisma";

class DeleteServicoCliente {
    async execute(id: number, clienteId: number) {


        const servico = await prismaClient.servico.findUnique({
        where: {
            id: id,
            clienteId: clienteId
        },
        });

        if(servico.draft === false) {
            throw new Error("Serviço não pode ser deletado, pois está em Andamento.");
        }


        await prismaClient.servico.delete({
            where: {
                id: id,
                clienteId: clienteId
            }
        });

    
        return servico;
    }

}

export { DeleteServicoCliente };
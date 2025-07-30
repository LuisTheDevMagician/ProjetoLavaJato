import prismaClient from "../../prisma";

class DetalheServicoService {
    async execute(id: number) {
        const servico = await prismaClient.servico.findMany({
            where: {
                id: id
            },
            include: {
                cliente:{
                    select: {
                        id: true,
                        nome: true
                    }
                },
                veiculo: {
                    select: {
                        id: true,
                        modelo: true,
                        placa: true
                    }
                }
            },
        });

        return servico;
    }
}

export { DetalheServicoService };
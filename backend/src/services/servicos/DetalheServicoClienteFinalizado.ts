import prismaClient from "../../prisma";

class DetalheServicoClienteFinalizadoService {
    async execute(clienteId: number) {
        const servico = await prismaClient.servico.findMany({
            where: {
                clienteId: clienteId,
                status: true,
            },
            include: {
                cliente:{
                    select: {
                        nome: true
                    }
                },
                funcionario: {
                    select: {
                        nome: true
                    }
                },
                veiculo: {
                    select: {
                        modelo: true,
                        placa: true
                    }
                }
            },
        });

        return servico;
    }
}

export { DetalheServicoClienteFinalizadoService };
import prismaClient from "../../prisma";

class DetalheServicoFuncionarioFinalizadoService {
    async execute(funcionarioId: number) {
        const servico = await prismaClient.servico.findMany({
            where: {
                funcionarioId: funcionarioId,
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

export { DetalheServicoFuncionarioFinalizadoService };
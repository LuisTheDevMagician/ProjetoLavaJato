import prismaClient from "../../prisma";

class DetalheServicoFuncionarioService {
    async execute(funcionarioId: number) {
        const servico = await prismaClient.servico.findMany({
            where: {
                funcionarioId: funcionarioId,
                status: false,
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

export { DetalheServicoFuncionarioService };
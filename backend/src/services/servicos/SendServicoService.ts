import prismaClient from "../../prisma";

interface SendRequest{
    servicoId: number;
    funcionarioId: number;
}

class SendServicoService {
    async execute({ servicoId, funcionarioId }: SendRequest) {
        const servico = await prismaClient.servico.update({
            where: {
                id: servicoId
            },
            data: {
                draft: false,
                funcionarioId: funcionarioId,
            },
        });

        return servico;
    }
}

export { SendServicoService };
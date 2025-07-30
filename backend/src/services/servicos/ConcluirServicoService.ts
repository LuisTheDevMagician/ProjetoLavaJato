import prismaClient from "../../prisma";

class ConcluirServicoService{
    async execute(id: number, funcionarioId: number) {
        

        const servico = await prismaClient.servico.update({
            where: { id , funcionarioId },
            data: {
                status: true,
            },
        });

        if (!servico) {
            throw new Error("Serviço não encontrado ou não autorizado.");
        }

        return servico;
    }
}

export { ConcluirServicoService };
import prismaClient from "../../prisma";

class DetalheFuncionarioService {
    async execute(user_id: string) {
        
        const funcionario = await prismaClient.funcionario.findFirst({
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


        return funcionario;
    }
}

export { DetalheFuncionarioService };
import prismaClient from "../../prisma";

class ListFuncionarioService {
    async execute() {
        const funcionarios = await prismaClient.funcionario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                funcao: true,
            }
        });
        return funcionarios;
    }
}

export { ListFuncionarioService };
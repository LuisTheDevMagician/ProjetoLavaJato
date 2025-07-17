import prismaClient from "../../prisma";
import {hash, compare} from 'bcryptjs';

interface deleteRequest{
    email: string;
    senha: string;
}

class DeleteFuncionarioService {
    async execute({ email, senha }: deleteRequest) {
        // Verificação de email
        if (!email) {
            throw new Error('Email incorreto');
        }

        // Verificação se o funcionário existe
        const funcionario = await prismaClient.funcionario.findFirst({
            where: {
                email: email
            }
        });

        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }

         // Verificar se a senha está correta
        const senhaCorreta = await compare(senha, funcionario.senha);

        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        }

        // Se a senha estiver correta, deletar o funcionário
        await prismaClient.funcionario.delete({
            where: {
                id: funcionario.id
            }
        });

        return { message: 'Funcionário deletado com sucesso' };
    }
}

export { DeleteFuncionarioService };
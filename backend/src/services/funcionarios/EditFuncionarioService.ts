import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UpdateRequest {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
}

class EditFuncionarioService {
    async execute({ id, nome, email, senha }: UpdateRequest) {
        // Verificar se o funcionário existe
        const funcionarioExistente = await prismaClient.funcionario.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!funcionarioExistente) {
            throw new Error('Funcionário não encontrado');
        }

        // Se o email está sendo alterado, verificar se o novo email já existe
        if (email && email !== funcionarioExistente.email) {
            const emailEmUso = await prismaClient.funcionario.findFirst({
                where: {
                    email: email
                }
            });

            if (emailEmUso) {
                throw new Error('Este email já está em uso por outro funcionário');
            }
        }

        // Se a senha está sendo alterada, criptografar a nova senha
        let senhaCriptografada = funcionarioExistente.senha;
        if (senha) {
            senhaCriptografada = await hash(senha, 8);
        }

        // Atualizar o funcionário
        const funcionarioAtualizado = await prismaClient.funcionario.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: nome !== undefined ? nome : funcionarioExistente.nome,
                email: email !== undefined ? email : funcionarioExistente.email,
                senha: senhaCriptografada,
                
            }
        });

        // Remover a senha do objeto retornado por segurança
        const { created_at, funcao, senha: _, ...funcionarioSemSenha } = funcionarioAtualizado;

        return funcionarioSemSenha;
    }
}

export { EditFuncionarioService };
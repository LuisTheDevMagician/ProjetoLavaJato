import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UpdateRequest {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    rua?: string;
    bairro?: string;
    numero?: string;
}

class EditClienteService {
    async execute({ id, nome, email, senha, rua, bairro, numero }: UpdateRequest) {
        // Verificar se o cliente existe
        const clienteExistente = await prismaClient.cliente.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!clienteExistente) {
            throw new Error('Cliente não encontrado');
        }

        // Se o email está sendo alterado, verificar se o novo email já existe
        if (email && email !== clienteExistente.email) {
            const emailEmUso = await prismaClient.cliente.findFirst({
                where: {
                    email: email
                }
            });

            if (emailEmUso) {
                throw new Error('Este email já está em uso por outro Cliente');
            }
        }

        // Se a senha está sendo alterada, criptografar a nova senha
        let senhaCriptografada = clienteExistente.senha;
        if (senha) {
            senhaCriptografada = await hash(senha, 8);
        }

        // Atualizar o cliente
        const clienteAtualizado = await prismaClient.cliente.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: nome !== undefined ? nome : clienteExistente.nome,
                email: email !== undefined ? email : clienteExistente.email,
                senha: senhaCriptografada,
                rua: rua !== undefined ? rua : clienteExistente.rua,
                bairro: bairro !== undefined ? bairro : clienteExistente.bairro,
                numero: numero !== undefined ? numero : clienteExistente.numero,
            }
        });

        // Remover a senha do objeto retornado por segurança
        const { created_at, funcao, senha: _, ...clienteSemSenha } = clienteAtualizado;

        return clienteSemSenha;
    }
}

export { EditClienteService };
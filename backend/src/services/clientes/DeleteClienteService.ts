import prismaClient from "../../prisma";
import { hash, compare } from 'bcryptjs';

interface DeleteRequest {
    email: string;
    senha: string;
}

class DeleteClienteService {
    async execute({ email, senha }: DeleteRequest) {
        // Verificar se o cliente existe
        const clienteExistente = await prismaClient.cliente.findUnique({
            where: {
                email: email
            }
        });

        if (!clienteExistente) {
            throw new Error('Cliente não encontrado');
        }

        // Verificar se a senha está correta
        const senhaValida = await compare(senha, clienteExistente.senha);
        if (!senhaValida) {
            throw new Error('Senha incorreta');
        }

        // Deletar o cliente
        await prismaClient.cliente.delete({
            where: {
                email: email
            }
        });

        return { message: 'Cliente deletado com sucesso' };
    }
}

export { DeleteClienteService };
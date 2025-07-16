import PrismaClient from '../../prisma'

interface ClienteRequest {
    nome: string;
    email: string;
    senha: string;
    rua: string;
    bairro: string;
    numero: string;
}

class CreateClienteService {
    async execute({ nome, email, senha, rua, bairro, numero }: ClienteRequest) {

        // Verificação de email
        if (!email) {
            throw new Error('Email incorreto');
        }

        // Verificação se email já existe
        const clienteJaExiste = await PrismaClient.cliente.findFirst({
            where: {
                email: email
            }
        });

        if (clienteJaExiste) {
            throw new Error('Cliente já cadastrado com esse email');
        }

        // Criação do cliente
        const cliente = await PrismaClient.cliente.create({
            data: {
                nome: nome,
                email: email,
                senha: senha,
                rua: rua,
                bairro: bairro,
                numero: numero
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        });

        return cliente;
    }
}

export { CreateClienteService };
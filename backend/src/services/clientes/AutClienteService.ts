import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";

interface AutRequest{
    email: string;
    senha: string;
}

class AutClienteService {
    async execute({ email, senha }: AutRequest) {
        // Verificação se o cliente existe com o email fornecido
        const cliente = await prismaClient.cliente.findFirst({
            where: {
                email: email,
            },
        });

        if (!cliente) {
            throw new Error("Usuário ou senha incorretos");
        }
    
        // Verificação de senha 
        const senhaValida = await compare(senha, cliente.senha);

        if (!senhaValida) {
            throw new Error("Usuário ou senha incorretos");
        }

        // Gerar um token JWT e devolver os dados do funcionário 
        const token = sign(
            {
                nome: cliente.nome,
                email: cliente.email
            },
            process.env.JWT_SECRET,
            {
                subject: cliente.id.toString(),
                expiresIn: "30d"
            }
        );

        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            token: token
        };
    }
}

export { AutClienteService };
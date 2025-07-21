import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";

interface AutRequest{
    email: string;
    senha: string;
}

class AutFuncionarioService {
    async execute({ email, senha }: AutRequest) {
        // Verificação se o funcionário existe com o email fornecido
        const funcionario = await prismaClient.funcionario.findFirst({
        where: {
            email: email,
        },
        });
    
        if (!funcionario) {
        throw new Error("Usuário ou senha incorretos");
        }
    
        // Verificação de senha 
        const senhaValida = await compare(senha, funcionario.senha);

        if (!senhaValida) {
            throw new Error("Usuário ou senha incorretos");
        }


        //gerar um token JWT e devolver os dados do funcionário 
        const token = sign(
            {
                nome: funcionario.nome,
                email: funcionario.email,
                funcao: funcionario.funcao
            },
            process.env.JWT_SECRET,
            {
                subject: funcionario.id.toString(),
                expiresIn: "30d"
            }
        )
        
        
        return {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            funcao: funcionario.funcao,
            token: token
        }
    }
}

export { AutFuncionarioService };
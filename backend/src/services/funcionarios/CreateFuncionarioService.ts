import PrismaClient from '../../prisma'
import {hash} from 'bcryptjs';

interface FuncionarioRequest{
    nome: string;
    email: string;
    senha: string;
}

class CreateFuncionarioService {
  async execute({ nome, email, senha } : FuncionarioRequest) {


    if(!email) {
      throw new Error('Email incorreto');
    }


    const funcionarioJaExiste = await PrismaClient.funcionario.findFirst({
        where: {
            email: email
        }
    })

    if(funcionarioJaExiste) {
      throw new Error('Funcionário já cadastrado com esse email');
    }

    const senhaHash = await hash(senha, 8);

    const funcionario = await PrismaClient.funcionario.create({
        data: {
            nome: nome,
            email: email,
            senha: senhaHash,
        },
        select: {
            id: true,
            nome: true,
            email: true,
        }
    });
    
    return funcionario;
  }
}

export { CreateFuncionarioService };
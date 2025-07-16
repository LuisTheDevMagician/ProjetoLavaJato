import {Request, Response} from 'express';
import { CreateFuncionarioService } from '../../services/funcionarios/CreateFuncionarioService';

class CreateFuncionarioController {
    async handle(request: Request, response: Response){
        const { nome, email, senha } = request.body;

        const createFuncionarioService = new CreateFuncionarioService();

         const funcionario = await createFuncionarioService.execute({nome, email, senha});


        return response.json(funcionario);
    }
}

export { CreateFuncionarioController}
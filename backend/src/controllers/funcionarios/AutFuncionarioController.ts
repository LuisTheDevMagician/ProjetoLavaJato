import { Request, Response } from "express";  
import {AutFuncionarioService} from '../../services/funcionarios/AutFuncionarioService' 

class AutFuncionarioController {
    async handle(request: Request, response: Response) {
        const { email, senha } = request.body;

        const autFuncionarioService = new AutFuncionarioService();

        const aut = await autFuncionarioService.execute({ email, senha });

        return response.json(aut);
    }
}

export { AutFuncionarioController };
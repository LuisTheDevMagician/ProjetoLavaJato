import { Request, Response } from "express";
import { DeleteFuncionarioService } from "../../services/funcionarios/DeleteFuncionarioService";

class DeleteFuncionarioController {
    async handle(request: Request, response: Response) {

        const { email, senha } = request.body;

        const deleteFuncionarioService = new DeleteFuncionarioService();

        const result = await deleteFuncionarioService.execute({ email, senha });

        return response.json(result);
    }
}

export { DeleteFuncionarioController };
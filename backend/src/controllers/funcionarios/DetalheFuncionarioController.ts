import { Request, Response } from "express";
import { DetalheFuncionarioService } from "../../services/funcionarios/DetalheFuncionarioService";

class DetalheFuncionarioController {
    async handle(request: Request, response: Response) {

        const user_id = request.user_id;

        const detalheFuncionaroService = new DetalheFuncionarioService();

        const funcionario = await detalheFuncionaroService.execute(user_id);

        return response.json(funcionario);
    }
}

export { DetalheFuncionarioController };
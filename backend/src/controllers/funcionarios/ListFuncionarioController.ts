import {Request, Response} from "express";
import { ListFuncionarioService } from "../../services/funcionarios/ListFuncionarioService";

class ListFuncionarioController {
    async handle(req: Request, res: Response) {
        const listFuncionarioService = new ListFuncionarioService();

        const funcionarios = await listFuncionarioService.execute();

        return res.json(funcionarios);
    }
}

export { ListFuncionarioController };
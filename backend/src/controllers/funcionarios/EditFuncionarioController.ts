import {Request, Response} from "express";
import { EditFuncionarioService } from "../../services/funcionarios/EditFuncionarioService";

class EditFuncionarioController {
    async handle(req: Request, res: Response) {
        const { id, nome, email, senha } = req.body;

        const editFuncionarioService = new EditFuncionarioService();

        try {
            const funcionario = await editFuncionarioService.execute({
                id,
                nome,
                email,
                senha
            });

            return res.json(funcionario);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditFuncionarioController };
import {Request, Response} from 'express';
import { EditCaProdutoService } from '../../services/categoriaProduto/EditCaProdutoService';

class EditCaProdutoController {
    async handle(req: Request, res: Response) {
        const { nome, novoNome } = req.body;

        const editCaProdutoService = new EditCaProdutoService();

        const result = await editCaProdutoService.execute(nome, novoNome);

        return res.json(result);
    }
}

export { EditCaProdutoController };

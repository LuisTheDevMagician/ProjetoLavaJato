import { Request, Response } from "express";
import { DeleteCaProdutoService } from "../../services/categoriaProduto/DeleteCaProdutoService";

class DeleteCaProdutoController {
    async handle(req: Request, res: Response) {
        const { nome } = req.body;

        const deleteCaProdutoService = new DeleteCaProdutoService();

        const result = await deleteCaProdutoService.execute(nome);

        return res.json(result);
    }
}

export { DeleteCaProdutoController };

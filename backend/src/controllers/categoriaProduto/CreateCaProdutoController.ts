import { Request, Response } from "express";
import { CreateCaProdutoService } from "../../services/categoriaProduto/CreateCaProdutoService";

class CreateCaProdutoController {
    async handle(req: Request, res: Response) {
        const { nome } = req.body;

        const createCaProdutoService = new CreateCaProdutoService();

        const categoriaProduto = await createCaProdutoService.execute({ nome });

        return res.json(categoriaProduto);
    }
}

export { CreateCaProdutoController };
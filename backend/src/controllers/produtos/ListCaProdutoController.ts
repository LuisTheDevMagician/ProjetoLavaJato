import {Request,Response} from 'express';
import { ListByCaProdutoService } from '../../services/produtos/ListByCaProdutoService';

class ListByCaProdutoController {
    async handle(req: Request, res: Response) {
        const categoriaProdutoId = Number(req.query.categoriaProdutoId);

        const listByCaProdutoService = new ListByCaProdutoService();

        const produtos = await listByCaProdutoService.execute({ categoriaProdutoId });

        return res.json(produtos);
    }
}

export { ListByCaProdutoController };
import {Request, Response} from 'express';
import { ListCaProdutoService } from '../../services/categoriaProduto/ListCaProdutoService';

class ListCaProdutoController {
    async handle(req: Request, res: Response) {
        const listCaProdutoService = new ListCaProdutoService();

        const categorias = await listCaProdutoService.execute();
        
        return res.json(categorias);
    }
}

export { ListCaProdutoController };
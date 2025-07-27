import {Request, Response} from 'express';
import { ListProdutoService } from '../../services/produtos/ListProdutoService';

class ListProdutoController {
  async handle(req: Request, res: Response) {
    const listProdutoService = new ListProdutoService();

    const produtos = await listProdutoService.execute();
    
    return res.json(produtos);
  }
}

export { ListProdutoController };
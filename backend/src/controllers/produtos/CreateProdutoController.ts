import {Request,Response} from 'express';
import { CreateProdutoService } from '../../services/produtos/CreateProdutoService';

class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const { nome, valor, quantidade, categoriaProdutoId } = req.body;

    const createProdutoService = new CreateProdutoService();

    if(!req.file) {
      throw new Error("Erro ao enviar imagem");
    }else{

      const {originalname, filename: imagem} = req.file;

      const produto = await createProdutoService.execute({
      nome,
      valor,
      quantidade,
      imagem,
      categoriaProdutoId
    });

    return res.json(produto);
    }
  }
}

export { CreateProdutoController };
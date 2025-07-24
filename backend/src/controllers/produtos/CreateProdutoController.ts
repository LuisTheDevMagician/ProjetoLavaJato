import {Request,Response} from 'express';
import { CreateProdutoService } from '../../services/produtos/CreateProdutoService';

class CreateProdutoController {
  async handle(req, res) {
    try {
      const { nome, valor, quantidade, categoriaProdutoId } = req.body;

      // Garantir que o arquivo foi enviado
      if (!req.file) {
        return res.status(400).json({ error: "Imagem não enviada" });
      }

      const imagem = req.file.filename;

      // Conversões seguras
      const valorNumber = Number(valor);
      const quantidadeNumber = Number(quantidade);
      const categoriaIdNumber = Number(categoriaProdutoId);

      // Validação mínima
      if (
        !nome ||
        isNaN(valorNumber) ||
        isNaN(quantidadeNumber) ||
        isNaN(categoriaIdNumber)
      ) {
        return res.status(400).json({ error: "Dados inválidos no corpo da requisição" });
      }

      const createProdutoService = new CreateProdutoService();

      const produto = await createProdutoService.execute({
        nome,
        valor: valorNumber,
        quantidade: quantidadeNumber,
        imagem,
        categoriaProdutoId: categoriaIdNumber,
      });

      return res.json(produto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno ao cadastrar produto" });
    }
  }
}

export { CreateProdutoController };
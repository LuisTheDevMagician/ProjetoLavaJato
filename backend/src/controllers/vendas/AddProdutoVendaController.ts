import {Response, Request} from 'express';
import { AddProdutoVendaService } from '../../services/vendas/AddProdutoVendaService';

class AddProdutoVendaController {
    async handle(req: Request, res: Response) {
        const { vendaId, produtoId, quantidade } = req.body;

        const addProdutoVendaService = new AddProdutoVendaService();

        const produtoVenda = await addProdutoVendaService.execute({
            vendaId,
            produtoId,
            quantidade
        });

        return res.json(produtoVenda);
    }
}

export { AddProdutoVendaController };

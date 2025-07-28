import {Request, Response} from 'express';
import { RemoveProdutoVenda } from '../../services/vendas/RemoveProdutoVenda';   

class RemoveProdutoVendaController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const removeProdutoVenda = new RemoveProdutoVenda();

        const remove = await removeProdutoVenda.execute(id);

        return res.json(remove);
    }
}

export { RemoveProdutoVendaController };


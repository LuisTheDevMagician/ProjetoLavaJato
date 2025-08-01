import {Request, Response} from 'express';
import { DetalheVendaService } from '../../services/vendas/DetalheVendaService';

class DetalheVendaController {
    async handle(req: Request, res: Response) {
        const vendaId = Number(req.query.vendaId); 

        const detalheVendaService = new DetalheVendaService();

        const venda = await detalheVendaService.execute({vendaId});

        return res.json(venda);
    }
}

export { DetalheVendaController };
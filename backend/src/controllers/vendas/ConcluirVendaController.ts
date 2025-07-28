import {Request, Response} from 'express';
import { ConcluirVendaService } from '../../services/vendas/ConcluirVendaService';

class ConcluirVendaController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const concluirVendaService = new ConcluirVendaService();

        const venda = await concluirVendaService.execute(id);

        return res.json(venda);
    }
}

export { ConcluirVendaController };
import {Request, Response} from 'express';
import { SendVendaService } from '../../services/vendas/SendVendaService';

class SendVendaController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const sendVendaService = new SendVendaService();

        const venda = await sendVendaService.execute(id);

        return res.json(venda);
    }
}

export { SendVendaController };
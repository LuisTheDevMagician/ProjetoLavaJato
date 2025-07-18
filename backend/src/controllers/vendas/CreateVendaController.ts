import {Request, Response} from 'express';
import { CreateVendaService } from '../../services/vendas/CreateVendaService';

class CreateVendaController {
    async handle(req: Request, res: Response) {
        const { valorTotal, clienteId } = req.body;

        const createVendaService = new CreateVendaService();

        const venda = await createVendaService.execute({ valorTotal, clienteId });
        
        return res.json(venda);
    }
}

export { CreateVendaController };
import {Request, Response} from 'express';
import { RemoveVendaService } from '../../services/vendas/RemoveVendaService';

class RemoveVendaController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const removeVendaService = new RemoveVendaService();


        const remove =  await removeVendaService.execute(id);

        return res.json(remove);

       
    }
}

export { RemoveVendaController };
import {Request, Response} from 'express';
import { RemoveVendaService } from '../../services/vendas/RemoveVendaService';

class RemoveVendaController {
    async handle(req: Request, res: Response) {
    try {
            const { id } = req.query;

            if (!id) {
            return res.status(400).json({ error: "ID da venda não informado." });
            }

            const removeVendaService = new RemoveVendaService();
            const remove = await removeVendaService.execute(Number(id));

            return res.json(remove);
        } catch (error: any) {
            console.error("Erro ao remover venda:", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

}

export { RemoveVendaController };
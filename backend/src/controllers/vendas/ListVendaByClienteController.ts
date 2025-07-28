import { Request, Response } from 'express';
import { ListVendaByClientService } from '../../services/vendas/ListVendaByClientService';

class ListVendaByClienteController {
  async handle(req: Request, res: Response) {
    const clienteId = Number(req.user_id);

    if (!clienteId || isNaN(clienteId)) {
      return res.status(400).json({ error: 'ID do cliente inválido.' });
    }

    const listVendaByClienteService = new ListVendaByClientService();

    const vendas = await listVendaByClienteService.execute({ clienteId });

    return res.json(vendas);
  }
}

export { ListVendaByClienteController };

import { Request, Response } from 'express';
import { ListVendaByClienteFinalizadaService } from '../../services/vendas/ListVendaByClienteFinalizadaService';

class ListVendaByClienteFinalizadaController {
  async handle(req: Request, res: Response) {
    const clienteId = Number(req.user_id);

    if (!clienteId || isNaN(clienteId)) {
      return res.status(400).json({ error: 'ID do cliente inválido.' });
    }

    const listVendaByClienteFinalizadaService = new ListVendaByClienteFinalizadaService();

    const vendas = await listVendaByClienteFinalizadaService.execute({ clienteId });

    return res.json(vendas);
  }
}

export { ListVendaByClienteFinalizadaController };

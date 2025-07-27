import {Request, Response} from 'express';
import {ListVendasService} from '../../services/vendas/ListarVendasService';

class ListVendasController {
  async handle(req: Request, res: Response) {
    
    const listVendasService = new ListVendasService();

    const vendas = await listVendasService.execute();

    return res.json(vendas);
  }
}

export { ListVendasController };
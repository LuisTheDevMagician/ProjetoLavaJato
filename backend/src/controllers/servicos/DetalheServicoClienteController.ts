import {Request, Response} from 'express';
import { DetalheServicoClienteService } from '../../services/servicos/DetalheServicoCliente';

class DetalheServicoClienteController {
    async handle(req: Request, res: Response) {
        const clienteId = Number(req.user_id);

        const detalheServicoClienteService = new DetalheServicoClienteService();

        const servico = await detalheServicoClienteService.execute(clienteId);

        return res.json(servico);
    }
}

export { DetalheServicoClienteController };
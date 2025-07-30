import {Request, Response} from 'express';
import { DetalheServicoClienteFinalizadoService } from '../../services/servicos/DetalheServicoClienteFinalizado';

class DetalheServicoClienteFinalizadoController {
    async handle(req: Request, res: Response) {
        const clienteId = Number(req.user_id);

        const detalheServicoClienteFinalizadoService = new DetalheServicoClienteFinalizadoService();

        const servico = await detalheServicoClienteFinalizadoService.execute(clienteId);

        return res.json(servico);
    }
}

export { DetalheServicoClienteFinalizadoController };
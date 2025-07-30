import {Request, Response} from 'express';
import { DetalheServicoService } from '../../services/servicos/DetalheServicoService';

class DetalheServicoController {
    async handle(req: Request, res: Response) {
        const  id  = Number(req.query.id);

        const detalheServicoService = new DetalheServicoService();

        const servico = await detalheServicoService.execute(id);

        return res.json(servico);
    }
}

export { DetalheServicoController };
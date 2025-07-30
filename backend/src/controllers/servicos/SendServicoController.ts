import {Request, Response} from 'express';
import { SendServicoService } from '../../services/servicos/SendServicoService';

class SendServicoController {
    async handle(req: Request, res: Response) {
        const { servicoId, funcionarioId } = req.body;

        const sendServicoService = new SendServicoService();

        const result = await sendServicoService.execute({
            servicoId,
            funcionarioId
        });

        return res.json(result);
    }
}

export { SendServicoController };
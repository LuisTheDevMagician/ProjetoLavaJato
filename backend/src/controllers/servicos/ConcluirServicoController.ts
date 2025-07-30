import {Request, Response} from 'express';
import { ConcluirServicoService } from '../../services/servicos/ConcluirServicoService';

class ConcluirServicoController {
    async handle(req: Request, res: Response) {
        const { servicoId, funcionarioId } = req.body;

        const concluirServicoService = new ConcluirServicoService();

        try {
            const result = await concluirServicoService.execute(servicoId, funcionarioId);
            return res.json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ConcluirServicoController };
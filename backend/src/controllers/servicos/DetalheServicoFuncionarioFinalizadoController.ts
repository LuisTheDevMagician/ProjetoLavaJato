import {Request, Response} from 'express';
import { DetalheServicoFuncionarioFinalizadoService } from '../../services/servicos/DetalheServicoFuncionarioFinalizadoService';

class DetalheServicoFuncionarioFinalizadoController {
    async handle(req: Request, res: Response) {
        const funcionarioId = Number(req.user_id);

        const detalheServicoFuncionarioFinalizadoService = new DetalheServicoFuncionarioFinalizadoService();

        const servico = await detalheServicoFuncionarioFinalizadoService.execute(funcionarioId);

        return res.json(servico);
    }
}

export { DetalheServicoFuncionarioFinalizadoController };
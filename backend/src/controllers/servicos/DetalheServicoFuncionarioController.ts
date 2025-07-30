import {Request, Response} from 'express';
import { DetalheServicoFuncionarioService } from '../../services/servicos/DetalheServicoFuncionarioService';

class DetalheServicoFuncionarioController {
    async handle(req: Request, res: Response) {
        const funcionarioId = Number(req.user_id);

        const detalheServicoFuncionarioService = new DetalheServicoFuncionarioService();

        const servico = await detalheServicoFuncionarioService.execute(funcionarioId);

        return res.json(servico);
    }
}

export { DetalheServicoFuncionarioController };
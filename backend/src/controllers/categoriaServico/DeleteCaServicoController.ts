import {Request, Response} from 'express';
import { DeleteCaServicoService } from '../../services/categoriaServico/DeleteCaServicoService';

class DeleteCaServicoController {
    async handle(request: Request, response: Response) {
        const { nome } = request.body;

        const deleteCaServicoService = new DeleteCaServicoService();

        const result = await deleteCaServicoService.execute(nome);

        return response.json(result);
    }
}

export { DeleteCaServicoController };
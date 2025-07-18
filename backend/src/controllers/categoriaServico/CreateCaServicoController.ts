import {Request, Response} from 'express';
import { CreateCaServicoService } from '../../services/categoriaServico/CreateCaServicoService';

class CreateCaServicoController {
    async handle(request: Request, response: Response) {
        const { nome, valor } = request.body;

        const createCaServicoService = new CreateCaServicoService();

        const result = await createCaServicoService.execute({ nome, valor });

        return response.json(result);
    }
}

export { CreateCaServicoController };
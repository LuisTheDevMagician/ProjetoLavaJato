import {Request, Response} from 'express';
import { ListCaServicoService } from '../../services/categoriaServico/ListCaServicoService';

class ListCaServicoController {
    async handle(request: Request, response: Response) {
        const listCaServicoService = new ListCaServicoService();

        const result = await listCaServicoService.execute();

        return response.json(result);
    }
}

export { ListCaServicoController };
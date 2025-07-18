import {Response, Request} from 'express';
import { CreateCaVeiculoService } from '../../services/categoriaVeiculo/CreateCaVeiculoService';

class CreateCaVeiculoController {
    async handle(request: Request, response: Response) {
        const { nome } = request.body;

        const createCaVeiculoService = new CreateCaVeiculoService();

        const categoriaVeiculo = await createCaVeiculoService.execute({ nome });

        return response.json(categoriaVeiculo);
    }
}

export { CreateCaVeiculoController };
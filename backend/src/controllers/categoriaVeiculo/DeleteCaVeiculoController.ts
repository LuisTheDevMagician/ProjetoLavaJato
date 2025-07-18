import {Response, Request} from 'express';
import { DeleteCaVeiculoService } from '../../services/categoriaVeiculo/DeleteCaVeiculoService';

class DeleteCaVeiculoController {
    async handle(request: Request, response: Response) {
        const { nome } = request.body;
        
        const deleteCaVeiculoService = new DeleteCaVeiculoService();

        const result = await deleteCaVeiculoService.execute(nome);

        return response.json(result);
    }
}

export { DeleteCaVeiculoController };
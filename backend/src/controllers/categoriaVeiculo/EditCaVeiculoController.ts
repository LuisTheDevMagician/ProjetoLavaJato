import {Request,Response} from 'express';
import { EditCaVeiculoService } from '../../services/categoriaVeiculo/EditCaVeiculoService';

class EditCaVeiculoController {
    async handle(request: Request, response: Response) {
        const { nome, novoNome } = request.body;

        const editCaVeiculoService = new EditCaVeiculoService();

        const result = await editCaVeiculoService.execute(nome, novoNome);

        return response.json(result);
    }
}

export { EditCaVeiculoController };
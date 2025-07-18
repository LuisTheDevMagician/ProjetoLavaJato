import {Request,Response} from 'express';
import { ListCaVeiculoService } from '../../services/categoriaVeiculo/ListCaVeiculoService';

class ListCaVeiculoController {
    async handle(request: Request, response: Response) {
        const listCaVeiculoService = new ListCaVeiculoService();

        const categorias = await listCaVeiculoService.execute();
        
        return response.json(categorias);
    }
}

export { ListCaVeiculoController };
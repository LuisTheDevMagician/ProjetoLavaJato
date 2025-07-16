import {Request, Response} from 'express';
import { CreateClienteService } from '../../services/clientes/CreateClienteService';

class CreateClienteController {
    async handle(request: Request, response: Response) {
        const { nome, email, senha, rua, bairro, numero } = request.body;

        const createClienteService = new CreateClienteService();

        const cliente = await createClienteService.execute({ nome, email, senha, rua, bairro, numero });

        return response.json(cliente);
    }
}

export { CreateClienteController };
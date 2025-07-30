import {Request,Response} from 'express';
import { DeleteServicoCliente } from '../../services/servicos/DeleteServicoClienteService';

class DeleteServicoClienteController {
    async handle(req: Request, res: Response) {
        const { id, clienteId } = req.body;

        const deleteServicoCliente = new DeleteServicoCliente();

        try {
            const servico = await deleteServicoCliente.execute(Number(id), Number(clienteId));
            return res.json(servico);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteServicoClienteController };
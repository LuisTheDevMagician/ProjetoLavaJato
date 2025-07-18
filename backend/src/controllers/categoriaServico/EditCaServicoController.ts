import { Request, Response } from 'express';
import { EditCaServicoService } from '../../services/categoriaServico/EditCaServicoService';

class EditCaServicoController {
    async handle(request: Request, response: Response) {
        const { nome, novoNome, valor } = request.body;

        const editCaServicoService = new EditCaServicoService();

        try {
            const categoriaServico = await editCaServicoService.execute({
                nome,
                novoNome,
                valor
            });

            return response.json(categoriaServico);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { EditCaServicoController };
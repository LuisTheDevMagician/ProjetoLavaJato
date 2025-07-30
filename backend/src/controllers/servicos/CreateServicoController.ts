import { Request, Response } from "express";
import CreateServicoService from "../../services/servicos/CreateServicoService";


class CreateServicoController {
  async handle(req: Request, res: Response) {
            const { categoriaServicoId, funcionarioId, veiculoId } = req.body;

        const clienteId = req.user_id;

        if (!clienteId || !categoriaServicoId || !veiculoId) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes." });
        }

        try {
            const createServicoService = new CreateServicoService();

            const servico = await createServicoService.execute({
            clienteId: Number(clienteId),
            categoriaServicoId: Number(categoriaServicoId),
            funcionarioId: funcionarioId ? Number(funcionarioId) : undefined,
            veiculoId: Number(veiculoId),
            });

            return res.status(201).json(servico);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        } 
    }
}

export { CreateServicoController };


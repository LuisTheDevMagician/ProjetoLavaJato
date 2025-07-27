// src/controllers/vendas/UpdateStatusVendaController.ts
import { Request, Response } from "express";
import { UpdateStatusVendaService } from "../../services/vendas/UpdateStatusVendaService";

class UpdateStatusVendaController {
  async handle(req: Request, res: Response) {
    const { vendaId, status } = req.body;

    if (!vendaId || !status) {
      return res.status(400).json({ error: "Venda ID e novo status são obrigatórios." });
    }

    try {
      const updateStatusService = new UpdateStatusVendaService();
      const vendaAtualizada = await updateStatusService.execute({
        vendaId: Number(vendaId),
        status,
      });

      return res.json(vendaAtualizada);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export { UpdateStatusVendaController };

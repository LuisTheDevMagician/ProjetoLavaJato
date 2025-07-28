import {Request, Response} from "express";
import { DeleteVeiculoByClienteService } from "../../services/veiculo/DeleteVeiculoByClienteService";

class DeleteVeiculoByClienteController {
  async handle(req: Request, res: Response) {
    try {
      const { veiculoId } = req.body;
      const clienteId = Number(req.user_id);

      if (!veiculoId || isNaN(clienteId)) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const deleteVeiculoByClienteService = new DeleteVeiculoByClienteService();
      const result = await deleteVeiculoByClienteService.execute(clienteId, veiculoId);

      return res.json(result);
    } catch (err: any) {
      console.error(err);
      return res.status(400).json({ error: err.message || "Erro ao deletar veículo" });
    }
  }
}


export { DeleteVeiculoByClienteController };
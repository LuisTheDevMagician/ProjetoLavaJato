import { Request, Response } from "express";
import { ListVeiculoByClienteService } from "../../services/veiculo/ListVeiculoByClienteService";

class ListVeiculoByClienteController {
  async handle(req: Request, res: Response) {
    const clienteId = req.query.clienteId;

    if (!clienteId || isNaN(Number(clienteId))) {
      return res.status(400).json({ error: "clienteId inválido" });
    }

    const listVeiculoByClienteService = new ListVeiculoByClienteService();
    const veiculos = await listVeiculoByClienteService.execute(Number(clienteId));

    return res.json(veiculos);
  }
}

export { ListVeiculoByClienteController };

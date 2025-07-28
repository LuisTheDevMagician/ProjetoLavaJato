import {Request, Response} from "express";
import {CreateVeiculoService} from "../../services/veiculo/CreateVeiculoService";

class CreateVeiculoController {
  async handle(req: Request, res: Response) {
    const { placa, modelo, cor, ano, clienteId, categoriaVeiculoId } = req.body;

    const createVeiculoService = new CreateVeiculoService();

    const clienteid = Number(clienteId);

    const veiculo = await createVeiculoService.execute({
      placa,
      modelo,
      cor,
      ano,
      clienteId: clienteid,
      categoriaVeiculoId
    });

    return res.json(veiculo);
  }
}

export { CreateVeiculoController };

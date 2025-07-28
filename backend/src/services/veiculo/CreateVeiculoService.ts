import prismaClient from "../../prisma";

interface VeiculoRequest{
    placa: string;
    modelo: string;
    cor: string;
    ano: string;
    clienteId: number;
    categoriaVeiculoId: number;
}

class CreateVeiculoService {
  async execute({ placa, modelo, cor, ano, clienteId, categoriaVeiculoId }: VeiculoRequest) {
    const veiculo = await prismaClient.veiculo.create({
      data: {
        placa: placa,
        modelo: modelo,
        cor: cor,
        ano: ano,
        clienteId: clienteId,
        categoriaVeiculoId: categoriaVeiculoId,
      },
    });

    return veiculo;
  }
}

export { CreateVeiculoService };

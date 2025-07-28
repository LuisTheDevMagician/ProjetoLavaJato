import prismaClient from "../../prisma";

class DeleteVeiculoByClienteService {
  async execute(clienteId: number, veiculoId: number) {
    const veiculo = await prismaClient.veiculo.findFirst({
      where: {
        id: veiculoId,
        clienteId: clienteId,
      },
    });

    if (!veiculo) {
      throw new Error("Veículo não encontrado");
    }

    await prismaClient.veiculo.delete({
      where: {
        id: veiculoId,
      },
    });
  }
}

export { DeleteVeiculoByClienteService };

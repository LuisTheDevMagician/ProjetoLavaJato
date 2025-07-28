import prismaClient from "../../prisma";

class ListVeiculoByClienteService {
  async execute(clienteId: number) {
    const veiculos = await prismaClient.veiculo.findMany({
      where: {
        clienteId: clienteId
      }
    });

    return veiculos;
  }
}

export { ListVeiculoByClienteService };
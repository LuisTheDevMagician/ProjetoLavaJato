import prismaClient from "../../prisma";

class RemoveVendaService {
  async execute(id: number) {
    const venda = await prismaClient.venda.findUnique({
      where: {
        id,
      },
    });

    if (!venda) {
      throw new Error("Venda não encontrada");
    }

    await prismaClient.venda.delete({
      where: {
        id,
      },
    });

    return venda;
  }
}

export { RemoveVendaService };
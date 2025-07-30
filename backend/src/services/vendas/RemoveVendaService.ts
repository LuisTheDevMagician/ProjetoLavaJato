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

    if (venda.status === true) {
      throw new Error("Venda já concluída, não é possível remover.");
    }

    await prismaClient.produtoVenda.deleteMany({
      where: { vendaId: id },
    });

    await prismaClient.venda.delete({
      where: {
        id,
      },
    });

    return venda;
  }
}

export { RemoveVendaService };
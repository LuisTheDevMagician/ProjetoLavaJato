import prismaClient from "../../prisma";

class ListVendasService {
  async execute() {
    const vendas = await prismaClient.venda.findMany({
        select:{
            id:true,
            valorTotal:true,
        },
        where: {
            status: true,
        },
        orderBy: {
            created_at: 'desc',
        },
    });

    return vendas;
  }
}

export { ListVendasService };
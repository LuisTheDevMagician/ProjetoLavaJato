import prismaClient from "../../prisma";

class ListProdutoService {
  async execute() {
    const produtos = await prismaClient.produto.findMany({
        select: {
            id: true,
            nome: true,
            valor: true,
            categoriaProduto: {
            select: {
                id: true,
                nome: true
            }
            },
            imagem: true
        }
    });
    return produtos;
  }
}

export { ListProdutoService };
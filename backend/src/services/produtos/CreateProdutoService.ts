import prismaClient from "../../prisma";

interface ProdutoRequest{
    nome: string;
    valor: number;
    quantidade: number;
    imagem: string;
    categoriaProdutoId: number;
}

class CreateProdutoService {
  async execute({ nome, valor, quantidade, imagem, categoriaProdutoId }: ProdutoRequest) {
    const produto = await prismaClient.produto.create({
      data: {
        nome: nome,
        valor: valor,
        quantidade: quantidade,
        imagem: imagem,
        categoriaProdutoId: categoriaProdutoId,
      },
    });

    return produto;
  }
}

export { CreateProdutoService };
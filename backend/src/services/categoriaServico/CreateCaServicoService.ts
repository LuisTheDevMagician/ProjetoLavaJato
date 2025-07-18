import prismaClient from "../../prisma";

interface CategoriaServicoRequest {
    nome: string;
    valor: number;
}

class CreateCaServicoService {
    async execute({ nome, valor }: CategoriaServicoRequest) {
        const categoriaServicoExistente = await prismaClient.categoriaServico.findUnique({
            where: {
                nome: nome
            }
        });

        if (categoriaServicoExistente) {
            throw new Error('Categoria de serviço já existe');
        }

        const categoriaServico = await prismaClient.categoriaServico.create({
            data: {
                nome: nome,
                valor: valor
            },
            select: {
                id: true,
                nome: true,
                valor: true
            }
        });

        return { message: 'Categoria de serviço criada com sucesso', ...categoriaServico };
    }
}

export { CreateCaServicoService };
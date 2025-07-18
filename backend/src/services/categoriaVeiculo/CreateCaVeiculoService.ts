import prismaClient from "../../prisma";

interface CategoriaVeiculoRequest {
    nome: string;
}

class CreateCaVeiculoService {
    async execute({ nome }: CategoriaVeiculoRequest) {

        // Verifica se a categoria de veículo já existe
        const categoriaExistente = await prismaClient.categoriaVeiculo.findUnique({
            where: {
                nome: nome,
            },
        });

        if (categoriaExistente) {
            throw new Error("Categoria de veículo já existe.");
        }

        // Cria a nova categoria de veículo
        const categoriaVeiculo = await prismaClient.categoriaVeiculo.create({
            data: {
                nome: nome,
            },
            select: {
                id: true,
                nome: true,
            },
        });

        return { message: 'Categoria de veículo criada com sucesso!', ...categoriaVeiculo };
    }
}

export { CreateCaVeiculoService };
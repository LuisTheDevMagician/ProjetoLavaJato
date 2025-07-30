import prismaClient from "../../prisma";

interface ServicoRequest {
    clienteId: number;
    categoriaServicoId: number;
    funcionarioId?: number;
    veiculoId: number;
}

export default class CreateServicoService {
    async execute({
        clienteId,
        categoriaServicoId,
        funcionarioId,
        veiculoId
    }: ServicoRequest) {
        const cliente = await prismaClient.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });

        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        const categoriaServico = await prismaClient.categoriaServico.findUnique({
            where: {
                id: categoriaServicoId,
            },
        });

        if (!categoriaServico) {
            throw new Error("Categoria de serviço não encontrada");
        }

        const nomeEnviado = categoriaServico.nome;
        const valorEnviado = categoriaServico.valor;
        const maodeobraEnviada = Number(categoriaServico.valor) * 0.4;

        const veiculo = await prismaClient.veiculo.findUnique({
            where: {
                id: veiculoId,
            },
        });

        if (!veiculo) {
            throw new Error("Veículo não encontrado");
        }

        const servico = await prismaClient.servico.create({
            data: {
                nomeServico: nomeEnviado,
                valor: valorEnviado,
                maoDeObra: maodeobraEnviada,
                clienteId: cliente.id,
                categoriaServicoId: categoriaServico.id,
                funcionarioId,
                veiculoId: veiculo.id
            }
        });

        return servico;
    }
}

export { CreateServicoService };
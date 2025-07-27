// src/services/vendas/UpdateStatusVendaService.ts
import prismaClient from "../../prisma";

interface UpdateStatusRequest {
  vendaId: number;
  status: 'PENDENTE' | 'FINALIZADO' | 'CANCELADO' | 'EM_ANDAMENTO';
}

class UpdateStatusVendaService {
  async execute({ vendaId, status }: UpdateStatusRequest) {
    const venda = await prismaClient.venda.update({
      where: { id: vendaId },
      data: {
        status,
        uptadet_at: new Date(),
      },
    });

    return venda;
  }
}

export { UpdateStatusVendaService };

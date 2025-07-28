// app/dashboardCliente/veiculos/deletar/page.tsx
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { DeleteVeiculoForm } from "@/app/dashboard/veiculos/deletar/components";

export default async function DeletarVeiculo() {
  const token = await getCookieServer();

  if (!token) {
  throw new Error("Token não encontrado. Usuário não autenticado.");
  }

  const decoded: any = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  const clienteId = decoded.sub;

  const response = await api.get(`/veiculosClientes?clienteId=${clienteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return <DeleteVeiculoForm veiculos={response.data} />;
}

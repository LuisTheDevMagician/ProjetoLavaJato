import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { ServicoForm } from "@/app/dashboard/components/solicitarForm";

export default async function CriarServico() {
  const token = await getCookieServer();

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  // Extrair clienteId do JWT
  const decoded: any = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const clienteId = Number(decoded.sub); // ou outro campo, se não for 'sub'

  // Buscar categorias e veículos do cliente autenticado
  const [categoriasRes, veiculosRes] = await Promise.all([
    api.get("/categoriaServicoList", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    api.get("/veiculosClientes", {
      headers: { Authorization: `Bearer ${token}` },
      params: { clienteId }, // clienteId real extraído do token
    }),
  ]);

  return (
    <>
      <ServicoForm
        categorias={categoriasRes.data}
        veiculos={veiculosRes.data}
      />
    </>
  );
}

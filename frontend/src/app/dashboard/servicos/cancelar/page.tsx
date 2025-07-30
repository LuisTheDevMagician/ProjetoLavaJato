import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { ListaServicosDraft } from "@/app/dashboard/components/cancelarServico";

export default async function DashboardFn() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/servicosDraftTrue", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const clienteRes = await api.get("/clienteInfo", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <ListaServicosDraft
      servicos={servicosRes.data}
      clienteId={clienteRes.data.id}
    />
  );
}
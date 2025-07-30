import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { ListaServicosDraft } from "./components/aceitarServico";

export default async function DashboardFn() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/servicosDraftTrue", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const funcionarioRes = await api.get("/funcionarioInfo", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <ListaServicosDraft
      servicos={servicosRes.data}
      funcionarioId={funcionarioRes.data.id}
    />
  );
}

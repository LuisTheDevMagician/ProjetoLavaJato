import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { ServicoFinalizado } from "../components/detalheFinalizado";


export default async function DashboardFn() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/detalheServicoFinalizado", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <>
      <ServicoFinalizado servicos={servicosRes.data} funcionarioId={servicosRes.data[0]?.funcionarioId} />
    </>
  );
}
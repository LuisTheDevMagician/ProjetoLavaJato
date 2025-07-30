import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { ConcluirServico } from "../components/detalheServico";


export default async function DashboardFn() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/detalheServico", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <>
      <ConcluirServico servicos={servicosRes.data} funcionarioId={servicosRes.data[0]?.funcionarioId} />
    </>
  );
}
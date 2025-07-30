import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { AcompanharServico } from "@/app/dashboard/components/detalheServico";


export default async function DashboardFn() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/detalheServicoCliente", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <>
      <AcompanharServico servicos={servicosRes.data} clienteId={servicosRes.data[0]?.clienteId} />
    </>
  );
}
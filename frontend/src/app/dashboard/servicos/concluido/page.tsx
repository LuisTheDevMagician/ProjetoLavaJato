import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { ServicoFinalizado } from "@/app/dashboard/components/detalheFinalizado";


export default async function ConcluidoCliente() {
  const token = await getCookieServer();

  const servicosRes = await api.get("/detalheServicoClienteFinalizado", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <>
      <ServicoFinalizado servicos={servicosRes.data} clienteId={servicosRes.data[0]?.clienteId} />
    </>
  );
}
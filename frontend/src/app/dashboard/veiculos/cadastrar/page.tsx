import {VeiculoForm} from "@/app/dashboard/veiculos/components/form";
import {api} from "@/services/api";
import {getCookieServer} from "@/lib/cookieServer";


export default async function CriarVeiculo() {

  const token = await getCookieServer();

  const response = await api.get('/categoriaVeiculoList', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });



  return (
    <>
      <VeiculoForm categorias={response.data} />
    </>
  );
}
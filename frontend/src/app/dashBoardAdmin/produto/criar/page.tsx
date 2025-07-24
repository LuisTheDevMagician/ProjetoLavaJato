import {ProdutoForm} from "@/app/dashBoardAdmin/produto/components/form";
import {api} from "@/services/api";
import {getCookieServer} from "@/lib/cookieServer";

export default async function CriarProduto() {

  const token = await getCookieServer();

  const response = await api.get('/categoriaProdutoList', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });



  return (
    <main style={{ position: "fixed", top: 70, left: 100, right: 0, bottom: 0 }}>
      <ProdutoForm categorias={response.data} />
    </main>
  );
}
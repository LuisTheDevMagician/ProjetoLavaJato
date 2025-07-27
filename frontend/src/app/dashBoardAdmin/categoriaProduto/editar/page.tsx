import { EditCategoriaForm } from "@/app/dashBoardAdmin/categoriaProduto/components/editCategoriaForm";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function EditarCategoriaProduto() {
  const token = await getCookieServer();

  const response = await api.get("/categoriaProdutoList", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
      <EditCategoriaForm categorias={response.data} />
  );
}

import { DeleteCategoriaForm} from "@/app/dashBoardAdmin/categoriaProduto/components/deleteCategoriaForm";
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
      <DeleteCategoriaForm categorias={response.data} />
  );
}

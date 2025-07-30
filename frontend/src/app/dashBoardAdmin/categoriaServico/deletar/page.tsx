import { DeleteCategoriaForm} from "@/app/dashBoardAdmin/categoriaServico/components/deleteCategoriaForm";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function EditarCategoriaServico() {
  const token = await getCookieServer();

  const response = await api.get("/categoriaServicoList", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
      <DeleteCategoriaForm categorias={response.data} />
  );
}

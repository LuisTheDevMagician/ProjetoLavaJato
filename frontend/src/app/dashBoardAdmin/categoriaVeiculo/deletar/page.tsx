import { DeleteCategoriaForm} from "@/app/dashBoardAdmin/categoriaVeiculo/components/deleteCategoriaForm";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function EditarCategoriaVeiculo() {
  const token = await getCookieServer();

  const response = await api.get("/categoriaVeiculoList", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
      <DeleteCategoriaForm categorias={response.data} />
  );
}

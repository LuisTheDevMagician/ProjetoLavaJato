import { EditCategoriaForm } from "@/app/dashBoardAdmin/categoriaVeiculo/components/editCategoriaForm";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function EditarCategoriaProduto() {
  const token = await getCookieServer();

  const response = await api.get("/categoriaVeiculoList", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
      <EditCategoriaForm categorias={response.data} />
  );
}

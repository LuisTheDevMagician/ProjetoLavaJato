import { Vendas } from "@/app/dashboard/components/vendas";
import {api} from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import {VendaProipiedads} from "@/lib/venda.type";



async function getVendas(): Promise<VendaProipiedads[] | []> {
    try{
        const token = await getCookieServer();

        const response = await api.get("/vendasclientes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data || [];

    }catch (error) {
        console.log(error)
        return [];
    }
}



export default  async function Page() {
  
    const vendas = await getVendas();
    
  return (
    <>
      <Vendas vendas={vendas} />
    </>
  );
}
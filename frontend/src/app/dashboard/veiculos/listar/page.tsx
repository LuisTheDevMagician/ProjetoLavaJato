import styles from './styles.module.scss';
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { toast } from 'sonner';


interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  ano: string;
}

export default async function ListarVeiculosCliente() {
  const token = await getCookieServer();

   if (!token) {
        toast.error("Usuário não autenticado.");
        return;
      }
  
  const decoded: any = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  const clienteId = decoded.sub;

  
  const response = await api.get<Veiculo[]>(`/veiculosClientes?clienteId=${clienteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const veiculos = response.data;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Meus Veículos</h1>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.id}</td>
              <td>{veiculo.placa}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.cor}</td>
              <td>{veiculo.ano}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

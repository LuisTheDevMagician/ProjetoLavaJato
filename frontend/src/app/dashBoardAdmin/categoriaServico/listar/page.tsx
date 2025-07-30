import styles from './styles.module.scss';
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";


interface Categoria {
  id: number; 
  nome: string;
  valor: number;
}

export default async function ListarProduto() {
  const token = await getCookieServer();

  const response = await api.get<Categoria[]>('/categoriaServicoList', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  
  const categorias = response.data.sort((a, b) => a.id - b.id);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Categorias de Produtos</h1>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>{Number(categoria.valor).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

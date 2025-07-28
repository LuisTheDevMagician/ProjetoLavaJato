
import styles from './styles.module.scss';
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";


interface Produto {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
  categoriaProduto: {
    nome: string;
  };
}

export default async function ListarProduto() {
  const token = await getCookieServer();

  const response = await api.get<Produto[]>('/produtosListAll', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const produtos = response.data;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>
      <div className={styles.grid}>
        {produtos.map((produto) => (
          <div key={produto.id} className={styles.card}>
            <div className={styles.imagemWrapper}>
              <img
                src={`http://localhost:3333/files/${produto.imagem}`}
                alt={produto.nome}
                width={250}
                height={180}
                className={styles.imagem}
                
              />
            </div>
            <h2>{produto.nome}</h2>
            <p><strong>Valor:</strong> R$ {Number(produto.valor).toFixed(2)}</p>
            <p><strong>Categoria:</strong> {produto.categoriaProduto.nome}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

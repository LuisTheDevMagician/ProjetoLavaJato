// app/dashboardFn/page.tsx
import { api } from '@/services/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './styles.module.scss'; // Você pode criar este SCSS depois

interface Servico {
  id: number;
  nomeServico: string;
  created_at: string;
}

export default async function DashboardFn() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/loginFuncionario');
  }

  try {
    const funcionarioRes = await api.get('/funcionarioInfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const servicosRes = await api.get<Servico[]>('/servicosDraftTrue', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const servicos = servicosRes.data;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Serviços em Rascunho</h1>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome do Serviço</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map(servico => (
              <tr key={servico.id}>
                <td>{servico.nomeServico}</td>
                <td>{new Date(servico.created_at).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (err) {
    redirect('/acesso-negado');
  }
}

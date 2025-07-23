// app/dashboardFn/page.tsx
import { api } from '@/services/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardFn() {
  // 1. Pega o token dos cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // 2. Se não tiver token, redireciona para login
  if (!token) {
    redirect('/loginFuncionario');
  }

  // 3. Verifica se o usuário é um funcionário
  try {
    const res = await api.get('/funcionarioInfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Se a API retornar dados, renderiza a página
    if (res.data) {
      return (
        <div>
          <h1>Área Restrita - Funcionários</h1>
          <p>Conteúdo exclusivo para funcionários autenticados.</p>
        </div>
      );
    }
  } catch (err) {
    // Se falhar, redireciona para acesso negado
    redirect('/acesso-negado');
  }

  // Se não for funcionário, bloqueia
  redirect('/acesso-negado');
}
// app/dashboardFn/page.tsx
import { api } from '@/services/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/loginAdmin');

  try {
    const res = await api.get('/adminInfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Só permite ADMIN
    if (res.data) {
      return (
        <div>
          <h1>Área Restrita - Administradores</h1>
          <p>Conteúdo exclusivo para administradores autenticados.</p>
        </div>
      );
    }

  } catch (err) {
    redirect('/acesso-negado');
  }

  redirect('/acesso-negado');
}

'use client';

import styles from './styles.module.scss';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CategoriaProduto() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');


  useEffect(() => {
    if (status === 'success') {
      toast.success('Categoria cadastrada com sucesso!');
    } else if (status === 'error') {
      toast.warning(`Erro ao cadastrar categoria`);
    }
  }, [status]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Manter Categorias de Veículos</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashBoardAdmin/categoriaVeiculo/criar" className={styles.actionButton}>Criar</Link>
        <Link href="/dashBoardAdmin/categoriaVeiculo/listar" className={styles.actionButton}>Listar</Link>
        <Link href="/dashBoardAdmin/categoriaVeiculo/editar" className={styles.actionButton}>Editar</Link>
        <Link href="/dashBoardAdmin/categoriaVeiculo/deletar" className={styles.actionButton}>Deletar</Link>
      </div>
    </main>
  );
}

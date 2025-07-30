'use client'

import styles from './styles.module.scss';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProdutoPage() {

    const searchParams = useSearchParams();
  const status = searchParams.get('status');


  useEffect(() => {
    if (status === 'success') {
      toast.success('Funcionário cadastrado com sucesso!');
    }
  }, [status]);


  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Manter Funcionários</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashBoardAdmin/usuarios/funcionarios/cadastrar" className={styles.actionButton}>Cadastrar</Link>
        <Link href="/dashBoardAdmin/usuarios/funcionarios/listar" className={styles.actionButton}>Listar</Link>
        <Link href="/dashBoardAdmin/usuarios/funcionarios/editar" className={styles.actionButton}>Editar</Link>
        <Link href="/dashBoardAdmin/usuarios/funcionarios/deletar" className={styles.actionButton}>Deletar</Link>
      </div>
    </main>
  )
}
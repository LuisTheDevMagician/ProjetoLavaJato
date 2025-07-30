'use client'

import styles from './styles.module.scss';
import Link from 'next/link';

export default function ProdutoPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Administração de Usuários</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashBoardAdmin/usuarios/funcionarios" className={styles.actionButton}>Funcionários</Link>
        <Link href="/dashBoardAdmin/usuarios/clientes" className={styles.actionButton}>Clientes</Link>
      </div>
    </main>
  )
}
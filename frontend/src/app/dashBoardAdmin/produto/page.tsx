'use client'

import styles from './styles.module.scss';
import Link from 'next/link';

export default function ProdutoPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Manter Produtos</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashBoardAdmin/produto/criar" className={styles.actionButton}>Criar</Link>
        <Link href="/dashBoardAdmin/produto/listar" className={styles.actionButton}>Listar</Link>
        <Link href="/dashBoardAdmin/produto/editar" className={styles.actionButton}>Editar</Link>
        <Link href="/dashBoardAdmin/produto/deletar" className={styles.actionButton}>Deletar</Link>
      </div>
    </main>
  )
}
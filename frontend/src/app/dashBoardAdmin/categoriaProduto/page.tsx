'use client'

import styles from './styles.module.scss';
import Link from 'next/link';


export default function CategoriaProduto() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Manter Categorias de Produtos</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashBoardAdmin/categoriaProduto/criar" className={styles.actionButton}>Criar</Link>
        <Link href="/dashBoardAdmin/categoriaProduto/listar" className={styles.actionButton}>Listar</Link>
        <Link href="/dashBoardAdmin/categoriaProduto/editar" className={styles.actionButton}>Editar</Link>
        <Link href="/dashBoardAdmin/categoriaProduto/deletar" className={styles.actionButton}>Deletar</Link>
      </div>
    </main>
  );
}

'use client'

import styles from './styles.module.scss';
import Link from 'next/link';

export default function VeiculosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Manter Veículos</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashboard/veiculos/cadastrar" className={styles.actionButton}>Cadastrar</Link>
        <Link href="/dashboard/veiculos/listar" className={styles.actionButton}>Listar</Link>
        <Link href="/dashboard/veiculos/editar" className={styles.actionButton}>Editar</Link>
        <Link href="/dashboard/veiculos/deletar" className={styles.actionButton}>Deletar</Link>
      </div>
    </main>
  )
}
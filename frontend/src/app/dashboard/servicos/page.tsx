'use client'

import styles from './styles.module.scss';
import Link from 'next/link';

export default function ServicosPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Serviços</h1>
      <div className={styles.buttonGroup}>
        <Link href="/dashboard/servicos/solicitar" className={styles.actionButton}>Solicitar Novo Serviço</Link>
        <Link href="/dashboard/servicos/cancelar" className={styles.actionButton}>Cancelar Serviço</Link>
        <Link href="/dashboard/servicos/andamento" className={styles.actionButton}>Em Andamento</Link>
        <Link href="/dashboard/servicos/concluido" className={styles.actionButton}>Concluídos</Link>
      </div>
    </main>
  )
}
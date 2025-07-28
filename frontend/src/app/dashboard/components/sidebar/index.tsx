'use client'

import styles from './styles.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashboard/comprar">Comprar</Link>
          </li>
          <li>
            <Link href="/dashboard/compras">Compras</Link>
          </li>
          <li>
            <Link href="/dashboard/historico">Histórico</Link>
          </li>
          <li>
            <Link href="/dashboard/veiculos">Veículos</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

'use client'

import styles from './styles.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashBoardAdmin/categoriaProduto">Solicitar Serviço</Link>
          </li>
          <li>
            <Link href="/dashBoardAdmin/comprar">Comprar</Link>
          </li>
          <li>
            <Link href="/dashboard/historico">Historico</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

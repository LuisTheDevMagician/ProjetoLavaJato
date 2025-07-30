'use client'

import styles from './styles.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashBoardFn/andamento">Em Andamento</Link>
          </li>
          <li>
            <Link href="/dashBoardFn/finalizados">Finalizados</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

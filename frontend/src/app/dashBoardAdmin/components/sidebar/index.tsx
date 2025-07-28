'use client'

import styles from './styles.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashBoardAdmin/categoriaProduto">Categorias de Produtos</Link>
          </li>
          <li>
            <Link href="/dashBoardAdmin/produto">Produtos</Link>
          </li>
          <li>
            <Link href="/dashBoardAdmin/categoriaVeiculo">Categoria de Veiculos</Link>
          </li>
          <li>
            <Link href="/dashBoardAdmin/usuarios">Usuários</Link>
          </li>
          <li>
            <Link href="/dashBoardAdmin/vendas">Vendas</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

"use client"

import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';
import logoImg from '/public/pinheiro.svg';
import { LogOutIcon } from 'lucide-react';
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie('token', { path: '/' });
    router.replace('/loginAdmin');
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/dashBoardAdmin'} className={styles.logo}>
          <Image
            alt="Logo"
            src={logoImg}
            width={120}
            height={120}
            priority={true}
            quality={100}
          />
        </Link>

        <h1>
          Painel de Controle - Administradores
        </h1>

        <form action={handleLogout}>
          <button type="submit">
            <LogOutIcon size={30} />
          </button>
        </form>
      </div>
    </header>
  )
}

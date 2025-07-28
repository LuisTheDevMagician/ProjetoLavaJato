"use client"

import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';
import logoImg from '/public/pinheiro.svg';
import { User2Icon } from 'lucide-react';
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import {toast} from "sonner";

export default function Header() {
  const router = useRouter();

  async function handleLogin() {
   router.push('/login');
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/'} className={styles.logo}>
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
          Seja bem-vindo Magnata
        </h1>

        <form action={handleLogin}>
          <button type="submit">
            <User2Icon size={30} />
          </button>
        </form>
      </div>
    </header>
  )
}

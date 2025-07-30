"use client"

import Header from "@/app/components/header";
import Image from "next/image";
import styles from "./styles.module.scss";
import logoImg from '/public/pinheiro.svg';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');


  useEffect(() => {
    if (status === 'success') {
      toast.success('Você foi cadastrado com sucesso!');
    }
  }, [status]);

  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles.card}>
          <Image 
            src={logoImg} 
            alt="Logo Estética Automotiva Pinheiro" 
            width={300} 
            height={300} 
            className={styles.logo}
          />
          <h2 className={styles.title}>Estética Automotiva Pinheiro</h2>
          <p className={styles.subtitle}>
            A melhor de Corrente Piauí<br/>
            Tradição, Excelência e Responsabilidade
          </p>
        </section>
      </main>
    </>
  );
}

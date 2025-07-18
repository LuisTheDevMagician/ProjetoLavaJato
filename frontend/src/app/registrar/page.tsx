import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.scss';
import logoImg from '/public/pinheiro.svg';
import { api } from '@/services/api';
import {redirect} from 'next/navigation';

async function handleRegister(formData: FormData){
  "use server";

  const nome = formData.get("nome");
  const email = formData.get("email");
  const senha = formData.get("senha");
  const rua = formData.get("rua");
  const bairro = formData.get("bairro");
  const numero = formData.get("numero");

  if(nome === '' || email === '' || senha === '' || rua === '' || bairro === '' || numero === ''){
    console.log('Preencha todos os campos');
    return;
  }

  try {
    await api.post("/clientes", {
      nome,
      email,
      senha,
      rua,
      bairro,
      numero
    })

  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  }

  redirect('/');
}


export default function registrar() {
  return (
    <>
      <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />

      <section className={styles.login}>
        <h1>Criando sua conta</h1>
        <form action={handleRegister}>
        <input type="text"
          required 
          name="nome"
          placeholder="Cadastre seu nome"
          className={styles.input} 
          />

          <input type="email"
          required 
          name="email"
          placeholder="Cadastre seu e-mail"
          className={styles.input} 
          />

           <input type="password"
          required 
          name="senha"
          placeholder="Cadastre sua senha"
          className={styles.input} 
          />

          <input type="text"
          required 
          name="rua"
          placeholder="Cadastre sua rua"
          className={styles.input} 
          />

          <input type="text"
          required 
          name="bairro"
          placeholder="Cadastre seu bairro"
          className={styles.input} 
          />

          <input type="text"
          required 
          name="numero"
          placeholder="Cadastre o número de sua casa"
          className={styles.input} 
          />

          <button type='submit' className={styles.button}>
            Cadastrar
          </button>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login
          </Link>

        </form>
      </section>
    </div>
    </>
  );
}
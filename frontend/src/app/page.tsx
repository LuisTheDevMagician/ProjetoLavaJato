import styles from './page.module.scss';
import logoImg from '/public/pinheiro.svg';
import Image from 'next/image';
import Link from 'next/link';


export default function Page() {
  return (
    <>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />

      <section className={styles.login}>
        <form >
          <input type="email"
          required 
          name="email"
          placeholder="Digite seu e-mail"
          className={styles.input} 
          />

           <input type="password"
          required 
          name="password"
          placeholder="Digite sua senha"
          className={styles.input} 
          />

          <button type='submit' className={styles.button}>
            Acessar
          </button>

          <Link href="/registrar" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </form>
      </section>
    </div>
    </>
  );
}
       
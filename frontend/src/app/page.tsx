import styles from './page.module.scss';
import logoImg from '/public/pinheiro.svg';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';

async function handleLogin(formData: FormData){
  "use server";

  const email = formData.get("email");
  const senha = formData.get("senha");


  if(email === '' || senha === ''){
    return;
  }

  try {
   const response = await api.post("/loginC", {
      email,
      senha
    });

    if(response.data.funcao !== 'CLIENTE'){
      console.error('Acesso negado: usuário não é cliente');
      return;
    }
    

    console.log('Login response:', response.data);

    const expressTime = 60 * 60 * 24 * 30 * 1000; 
    const cookieStore = await cookies();

    cookieStore.set('token', response.data.token,{
      maxAge: expressTime,
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    if(!response.data.token){
      return;
    }

  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }

  redirect('/dashboard');
}



export default function Page() {
  return (
    <>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />

      <section className={styles.login}>
        <form action={handleLogin}>
          <h1>Login Clientes</h1>
          <input type="email"
          required 
          name="email"
          placeholder="Digite seu e-mail"
          className={styles.input} 
          />

           <input type="password"
          required 
          name="senha"
          placeholder="Digite sua senha"
          className={styles.input} 
          />

          <button type='submit' className={styles.button}>
            Acessar
          </button>

          <Link href="/registrar" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
          <Link href="/loginFuncionario" className={styles.text}>
            Login Funcionários
          </Link>

        </form>
      </section>
    </div>
    </>
  );
}
       
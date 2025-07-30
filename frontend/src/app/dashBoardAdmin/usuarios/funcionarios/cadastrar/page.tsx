import styles from './styles.module.scss';
import { api } from '@/services/api';
import {redirect} from 'next/navigation';
import {getCookieServer} from "@/lib/cookieServer"
import { headers } from 'next/headers';


async function handleRegister(formData: FormData){
  "use server";

  const nome = formData.get("nome");
  const email = formData.get("email");
  const senha = formData.get("senha");

  if(nome === '' || email === '' || senha === ''){
    console.log('Preencha todos os campos');
    return;
  }

  const token = await getCookieServer();

  try {
    await api.post("/funcionarios",
  {
    nome,
    email,
    senha,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)


  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  }

  redirect('/dashBoardAdmin/usuarios/funcionarios?status=success');
}


export default function CadastrarFuncionario() {
  return (
    <>
      <div className={styles.containerCenter}>

      <section className={styles.login}>
        <h1>Cadastrando Funcionário</h1>
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

          <button type='submit' className={styles.button}>
            Cadastrar
          </button>

        </form>
      </section>
    </div>
    </>
  );
}
import styles from './styles.module.scss';
import {Button} from "@/app/dashBoardAdmin/components/button";
import {api} from "@/services/api"
import {getCookieServer} from "@/lib/cookieServer"
import {redirect} from "next/navigation";

export default function CriarCategoriaServico() {


  const handleRegistrarCategoriaServico = async (formData: FormData) => {
    'use server';

    const nome = formData.get('nome');
    const valor = formData.get('valor');

    if(nome === "") return;
    
    const data = {
      nome: nome,
      valor: valor
    }

    const token = await getCookieServer();

    await api.post('/categoriaServico', data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .catch ((error) => {  
      console.error( error);
      redirect('/dashBoardAdmin/categoriaServico?status=error');
    });

    redirect('/dashBoardAdmin/categoriaServico?status=success');

  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Criar Nova Categoria de Serviço</h1>
      <form className={styles.form} action={handleRegistrarCategoriaServico}>
        <input type="text" className={styles.input} 
        placeholder="Nome da Categoria" 
        name="nome"
        required
        />

        <input type="number" className={styles.input} 
        placeholder="Valor do Serviço" 
        name="valor"
        required
        />

        <Button nome="Cadastrar" />
      </form>
    </main>
  );
}

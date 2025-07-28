import styles from './styles.module.scss';
import {Button} from "@/app/dashBoardAdmin/components/button";
import {api} from "@/services/api"
import {getCookieServer} from "@/lib/cookieServer"
import {redirect} from "next/navigation";

export default function CriarCategoriaProduto() {


  const handleRegistrarCategoriaProduto = async (formData: FormData) => {
    'use server';

    const nome = formData.get('nome');

    if(nome === "") return;
    
    const data = {
      nome: nome
    }

    const token = await getCookieServer();

    await api.post('/categoriaVeiculo', data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .catch ((error) => {  
      console.error( error);
      redirect('/dashBoardAdmin/categoriaVeiculo?status=error');
    });

    redirect('/dashBoardAdmin/categoriaVeiculo?status=success');

  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Criar Nova Categoria de Veiculo</h1>
      <form className={styles.form} action={handleRegistrarCategoriaProduto}>
        <input type="text" className={styles.input} 
        placeholder="Nome da Categoria" 
        name="nome"
        required
        />

        <Button nome="Cadastrar" />
      </form>
    </main>
  );
}

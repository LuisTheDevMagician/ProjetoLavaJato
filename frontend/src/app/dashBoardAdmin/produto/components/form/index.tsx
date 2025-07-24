"use client";

import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import {UploadCloud} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/app/dashBoardAdmin/components/button';
import { api } from '@/services/api';
import {getCookieClient} from "@/lib/cookieClient";
import { redirect } from 'next/navigation';

interface CategoriasPropiedade{
  id: string;
  nome: string;
}

interface Propiedades{
    categorias: CategoriasPropiedade[];
}

export function ProdutoForm({ categorias }: Propiedades) {

    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState("");

    async function handleRegisterProduct(formData: FormData) {
        const categoriaIndex = formData.get('categoria');
        const nome = formData.get('nome');
        const valor = formData.get('valor');
        const quantidade = formData.get('quantidade');

        if(!nome || !valor || !quantidade || !categoriaIndex || !image){ 
            return;
        }


        const data = new FormData();

        
        data.append('nome', nome);
        data.append('valor', valor);
        data.append('quantidade', quantidade);
        data.append('file', image);
        data.append('categoriaProdutoId', categorias[Number(categoriaIndex)].id);

        const token = await getCookieClient();

        await api.post('/produtos', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .catch((error) => {
            console.error(error);
            return;
        });

        redirect('/dashBoardAdmin/produto');

        
    }

    function handleFile(event: ChangeEvent<HTMLInputElement>){
        if(event.target.files && event.target.files[0]){
            const image = event.target.files[0];

            if(image.type !== "image/png" && image.type !== "image/jpeg" && image.type !== "image/jpg"){
                console.log("Formato de imagem inválido");
            }

            setImage(image);
            setImagePreview(URL.createObjectURL(image));
            
        }
    }


  return (
   <main className={styles.container}>
        <h1>Criar Novo Produto</h1>
        <form className={styles.form} action={handleRegisterProduct}>

            <label className={styles.labelImage} >
                <span>
                    <UploadCloud size={100} color= 'var(--blue-rcraft)'/>
                </span>

                <input 
                    type="file"
                    accept='image/png, image/jpeg, image/jpg'
                    required
                    onChange={handleFile}
                />
                
                {imagePreview &&(
                    <Image 
                        src={imagePreview}
                        alt='Preview'
                        className={styles.preview}
                        fill={true}
                        quality={100}
                        priority={true}
                    />
                )}

            </label>

            <select name="categoria">
                   {categorias.map((categoria, index) => (
                       <option key={categoria.id} value={index}>
                           {categoria.nome}
                       </option>
                   ))}
            </select>

                <input 
                    type="text" 
                    name="nome" 
                    placeholder='Nome do Produto' 
                    required
                    className={styles.input}
                />

                <input 
                    type="number" 
                    name="valor" 
                    placeholder='Preço do Produto' 
                    required
                    className={styles.input}
                />

                <input 
                    type="number" 
                    name="quantidade" 
                    placeholder='Quantidade do Produto' 
                    required
                    className={styles.input}
                />

                <Button nome="Cadastrar" />

            

        </form>
   </main>
  );
}
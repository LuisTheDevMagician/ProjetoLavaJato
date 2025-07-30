"use client";

import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashBoardAdmin/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Categoria {
  id: number;
  nome: string;
  
}

interface Props {
  categorias: Categoria[];
}

export function DeleteCategoriaForm({ categorias }: Props) {
  const router = useRouter();
  const [categoriaNome, setCategoriaNome] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!categoriaNome) {
      toast.warning("Selecione uma categoria para deletar");
      return;
    }

    const token = await getCookieClient();

    try {
      await api.delete("/categoriaServicoDelete", {
        data: { nome: categoriaNome },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Categoria deletada com sucesso!");
      router.push("/dashBoardAdmin/categoriaServico");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao deletar categoria");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Deletar Categoria de Serviço</h1>

      <select
        value={categoriaNome}
        onChange={(e) => setCategoriaNome(e.target.value)}
        className={styles.input}
        required
      >
        <option value="" disabled>
          Selecione a categoria
        </option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nome}>
            {cat.nome}
          </option>
        ))}
      </select>

      <Button nome="Deletar Categoria" />
    </form>
  );
}

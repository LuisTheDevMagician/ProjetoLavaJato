"use client";

import { useState, ChangeEvent, FormEvent } from "react";
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

export function EditCategoriaForm({ categorias }: Props) {
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [novoNome, setNovoNome] = useState("");

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!categoriaSelecionada || !novoNome.trim()) {
    toast.warning("Preencha todos os campos!");
    return;
  }

  const token = await getCookieClient();

  try {
    await api.put(
      "/categoriaProdutoEdit",
      {
        nome: categoriaSelecionada,
        novoNome,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Categoria atualizada com sucesso!");
    router.push("/dashBoardAdmin/categoriaProduto");
  } catch (err) {
    toast.warning("Erro ao atualizar categoria. Nome pode já estar em uso.");
    console.error(err);
  }
};


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Editar Categoria de Produto</h1>

      <select
        name="categoria"
        value={categoriaSelecionada}
        onChange={(e) => setCategoriaSelecionada(e.target.value)}
        className={styles.input}
        required
      >
        <option value="" disabled>Selecione a categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nome}>
            {cat.nome}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="novoNome"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        placeholder="Novo nome da categoria"
        className={styles.input}
        required
      />

      <Button nome="Salvar Alterações" />
    </form>
  );
}

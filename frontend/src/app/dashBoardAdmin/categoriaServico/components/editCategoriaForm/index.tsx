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
  valor: number;
}

interface Props {
  categorias: Categoria[];
}

export function EditCategoriaForm({ categorias }: Props) {
  const router = useRouter();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoValor, setNovoValor] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  if (!categoriaSelecionada) {
    toast.warning("Selecione uma categoria para editar.");
    return;
  }

  if (!novoNome.trim() && !novoValor) {
    toast.warning("Preencha pelo menos um campo para atualizar.");
    return;
  }

  const token = await getCookieClient();

  try {
    const payload: Record<string, any> = {
      nome: categoriaSelecionada,
    };

    if (novoNome.trim()) {
      payload.novoNome = novoNome;
    }

    if (novoValor) {
      payload.valor = novoValor;
    }

    await api.put("/categoriaServicoEdit", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Categoria atualizada com sucesso!");
    router.push("/dashBoardAdmin/categoriaServico");
  } catch (err) {
    toast.warning("Erro ao atualizar categoria. Nome pode já estar em uso.");
    console.error(err);
  }
};



  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Editar Categoria de Serviço</h1>

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
      />

      <input
        type="number"
        name="novoValor"
        value={novoValor}
        onChange={(e) => setNovoValor(Number(e.target.value))}
        placeholder="Novo valor da categoria"
        className={styles.input}
      />

      <Button nome="Salvar Alterações" />
    </form>
  );
}

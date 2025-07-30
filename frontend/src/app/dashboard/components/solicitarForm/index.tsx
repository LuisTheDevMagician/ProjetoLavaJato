"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CategoriaServico {
  id: number;
  nome: string;
  valor: string;
}

interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
}

interface Props {
  categorias: CategoriaServico[];
  veiculos: Veiculo[];
}

export function ServicoForm({ categorias, veiculos }: Props) {
  const [categoriaIndex, setCategoriaIndex] = useState("0");
  const [veiculoId, setVeiculoId] = useState("");

  const router = useRouter();

  async function handleCadastrarServico(e: FormEvent) {
    e.preventDefault();

    if (!veiculoId || !categoriaIndex) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const token = await getCookieClient();

    try {
      await api.post(
        "/servicos",
        {
          categoriaServicoId: categorias[Number(categoriaIndex)].id,
          veiculoId: Number(veiculoId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Serviço cadastrado com sucesso!");
      router.push("/dashboard/servicos");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar serviço.");
    }
  }

  return (
    <main className={styles.container}>
      <h1>Solicitar Serviço</h1>
      <form className={styles.form} onSubmit={handleCadastrarServico}>
        <label>Categoria de Serviço:</label>
        <select
          value={categoriaIndex}
          onChange={(e) => setCategoriaIndex(e.target.value)}
        >
          {categorias.map((categoria, index) => (
            <option key={categoria.id} value={index}>
              {categoria.nome} - R$ {Number(categoria.valor).toFixed(2)}
            </option>
          ))}
        </select>

        <label>Veículo:</label>
        <select
          value={veiculoId}
          onChange={(e) => setVeiculoId(e.target.value)}
        >
          <option value="">Selecione o veículo</option>
          {veiculos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.modelo} - {v.placa}
            </option>
          ))}
        </select>

        <Button nome="Solicitar Serviço" />
      </form>
    </main>
  );
}

"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { error } from "console";

interface CategoriaVeiculo {
  id: number;
  nome: string;
}

interface VeiculoFormProps {
  categorias: CategoriaVeiculo[];
}

export function VeiculoForm({ categorias }: VeiculoFormProps) {
  const router = useRouter();

  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [ano, setAno] = useState("");
  const [categoriaIndex, setCategoriaIndex] = useState("");

  async function handleRegisterVeiculo(event: FormEvent) {
    event.preventDefault();

    if (!placa || !modelo || !cor || !ano || !categoriaIndex) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const categoriaSelecionada = categorias[Number(categoriaIndex)];

    if (!categoriaSelecionada) {
      toast.warning("Categoria inválida.");
      return;
    }

    try {
      const token = await getCookieClient();

      if (!token) {
        toast.error("Usuário não autenticado.");
        return;
      }

      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      const clienteId = decoded.sub;

      console.log({
        placa,
        modelo,
        cor,
        ano,
        clienteId,
        categoriaVeiculoId: categoriaSelecionada?.id,
      });

      await api.post(
        "/veiculos",
        {
          placa,
          modelo,
          cor,
          ano,
          clienteId,
          categoriaVeiculoId: categoriaSelecionada.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Veículo cadastrado com sucesso!");
      router.push("/dashboard/veiculos");
    } catch (err) {
      console.error(err);
      console.log(err);
      toast.error("Erro ao cadastrar veículo. Tente novamente.");
    }
  }

  return (
    <main className={styles.container}>
      <h1>Cadastrar Novo Veículo</h1>
      <form className={styles.form} onSubmit={handleRegisterVeiculo}>
        <input
          type="text"
          placeholder="Placa do Veículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className={styles.input}
        />

        <select
          className={styles.input}
          value={categoriaIndex}
          onChange={(e) => setCategoriaIndex(e.target.value)}
        >
          <option value="">Selecione a Categoria</option>
          {categorias.map((categoria, index) => (
            <option key={categoria.id} value={index}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <Button nome="Cadastrar Veículo" />
      </form>
    </main>
  );
}

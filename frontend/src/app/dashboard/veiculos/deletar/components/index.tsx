
"use client";

import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
}

interface Props {
  veiculos: Veiculo[];
}

export function DeleteVeiculoForm({ veiculos }: Props) {
  const router = useRouter();
  const [veiculoId, setVeiculoId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!veiculoId) {
      toast.warning("Selecione um veículo para deletar");
      return;
    }

    const token = await getCookieClient();

    try {
      await api.delete("/veiculosDelete", {
        data: { veiculoId: Number(veiculoId) },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Veículo deletado com sucesso!");
      router.push("/dashboard/veiculos");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao deletar veículo");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Deletar Veículo</h1>

      <select
        value={veiculoId}
        onChange={(e) => setVeiculoId(e.target.value)}
        className={styles.input}
        required
      >
        <option value="" disabled>
          Selecione o veículo
        </option>
        {veiculos.map((v) => (
          <option key={v.id} value={v.id}>
            {v.placa} - {v.modelo}
          </option>
        ))}
      </select>

      <Button nome="Deletar Veículo" />
    </form>
  );
}

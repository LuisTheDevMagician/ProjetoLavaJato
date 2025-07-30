"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "sonner";
import { api } from "@/services/api";
import { CancelarButton } from "@/app/dashboard/components/cancelarButton";
import { useRouter } from "next/navigation";
import { getCookieClient } from "@/lib/cookieClient";

interface Servico {
  id: number;
  nomeServico: string;
  created_at: string;
}

interface Props {
  servicos: Servico[];
  clienteId: number;
}

export function ListaServicosDraft({ servicos, clienteId }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const router = useRouter();

  const cancelarServico = async (servicoId: number) => {

    const token = await getCookieClient();

    try {
      setLoadingId(servicoId);
      await api.delete("/servicosDelete", {
        data: {
          id: servicoId,
          clienteId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Serviço cancelado com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar o serviço.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Serviços Disponíveis</h1>

      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Tipo de Serviço</th>
            <th>Data de Chegada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td>{servico.nomeServico}</td>
              <td>{new Date(servico.created_at).toLocaleDateString("pt-BR")}</td>
              <td>
                <CancelarButton
                  texto={loadingId === servico.id ? "Cancelando..." : "Cancelar"}
                  onClick={() => cancelarServico(servico.id)}
                  disabled={loadingId === servico.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

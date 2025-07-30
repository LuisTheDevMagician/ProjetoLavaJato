"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "sonner";
import { api } from "@/services/api";
import { AceitarButton } from "@/app/dashBoardFn/components/button";
import { useRouter } from "next/navigation";
import { getCookieClient } from "@/lib/cookieClient";

interface Servico {
  id: number;
  nomeServico: string;
  created_at: string;
}

interface Props {
  servicos: Servico[];
  funcionarioId: number;
}

export function ListaServicosDraft({ servicos, funcionarioId }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const router = useRouter();

  const aceitarServico = async (servicoId: number) => {

    const token = await getCookieClient();

    try {
      setLoadingId(servicoId);
      await api.put("/sendServico", {
        servicoId,
        funcionarioId,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Serviço aceito com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao aceitar o serviço.");
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
                <AceitarButton
                  texto={loadingId === servico.id ? "Aceitando..." : "Aceitar"}
                  onClick={() => aceitarServico(servico.id)}
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

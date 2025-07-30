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
  maoDeObra: string;
  uptadet_at: string;
  cliente: {
    nome: string;
  };
  funcionario: {
    nome: string;
  };
  veiculo: {
    modelo: string;
    placa: string;
  };
}

interface Props {
  servicos: Servico[];
  funcionarioId: number;
}

export function ServicoFinalizado({ servicos, funcionarioId }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const router = useRouter();


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Serviços Finalizados</h1>

      <section className={styles.aviso}>
        {servicos.length === 0 && (
          <span className={styles.noServicos}>Nenhum serviço disponível</span>
        )}
      </section>

      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>ID Serviço</th>
            <th>Tipo de Serviço</th>
            <th>Mão de Obra</th>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Modelo</th>
            <th>Placa</th>
            <th>Data de Conclusão</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td>{servico.id}</td>
              <td>{servico.nomeServico}</td>
              <td>{servico.maoDeObra}</td>
              <td>{servico.cliente.nome}</td>
              <td>{servico.funcionario.nome}</td>
              <td>{servico.veiculo.modelo}</td>
              <td>{servico.veiculo.placa}</td>
              <td>{new Date(servico.uptadet_at).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
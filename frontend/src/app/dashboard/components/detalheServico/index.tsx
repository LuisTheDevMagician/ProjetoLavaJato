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
  maoDeObra: string;
  created_at: string;
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
  clienteId: number;
}

export function AcompanharServico({ servicos, clienteId }: Props) {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Serviços Disponíveis</h1>

      <section className={styles.aviso}>
        {servicos.length === 0 && (
          <span className={styles.noServicos}>Nenhum Em Andamento no Momento</span>
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
            <th>Data de Chegada</th>
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
              <td>{new Date(servico.created_at).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
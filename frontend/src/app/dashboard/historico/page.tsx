"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { toast } from "sonner";

interface Venda {
  id: number;
  valor: number;
  status: boolean;
  created_at: string;
}

export default function HistoricoPedidos() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendas() {
      try {
        const token = await getCookieClient();
        if (!token) {
          toast.error("Token não encontrado.");
          return;
        }

        // Decodifica o token para obter o clienteId
        const payload = JSON.parse(atob(token.split(".")[1]));
        const clienteId = payload.sub;

        const response = await api.get("/vendasclientes", {
          params: { clienteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVendas(response.data);
      } catch (error) {
        toast.error("Erro ao buscar histórico de pedidos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendas();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Histórico de Pedidos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : vendas.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={venda.id}>
                <td>{index + 1}</td>
                <td>R$ {venda.valor}</td>
                <td>{venda.status}</td>
                <td>{new Date(venda.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

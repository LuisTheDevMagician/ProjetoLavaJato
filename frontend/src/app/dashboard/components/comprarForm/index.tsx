"use client";

import { useEffect, useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { Button } from "@/app/dashBoardAdmin/components/button";

interface Produto {
  id: number;
  nome: string;
  valor: string;
}

interface ProdutoVenda {
  produtoId: number;
  nome: string;
  quantidade: number;
  valor: number;
}

export function VendaForm() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itensVenda, setItensVenda] = useState<ProdutoVenda[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);

  useEffect(() => {
    async function initData() {
      try {
        const token = await getCookieClient();
        if (!token) {
          toast.error("Token de autenticação não encontrado.");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const id = Number(payload.sub);
        setClienteId(id);

        const response = await api.get("/produtosListAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar dados.");
        console.error(error);
      }
    }

    initData();
  }, []);

  const adicionarProduto = () => {
    const produto = produtos.find((p) => p.id === Number(produtoId));
    if (!produto || quantidade < 1) {
      toast.warning("Produto inválido ou quantidade inválida.");
      return;
    }

    setItensVenda((prev) => [
      ...prev,
      {
        produtoId: produto.id,
        nome: produto.nome,
        quantidade,
        valor: Number(produto.valor),
      },
    ]);

    setProdutoId("");
    setQuantidade(1);
  };

  const removerProduto = (index: number) => {
    setItensVenda((prev) => prev.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return itensVenda.reduce(
      (total, item) => total + item.valor * item.quantidade,
      0
    );
  };

  const enviarVenda = async (e: FormEvent) => {
    e.preventDefault();

    if (!clienteId || itensVenda.length === 0) {
      toast.warning("Adicione produtos à venda.");
      return;
    }

    try {
      const token = await getCookieClient();

      // Cria a venda
      const responseVenda = await api.post(
        "/vendas",
        {
          valorTotal: calcularTotal(),
          clienteId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const vendaCriada = responseVenda.data;

      // Associa os produtos
      for (const item of itensVenda) {
        await api.post(
          "/addProdutoVenda",
          {
            vendaId: vendaCriada.id,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Venda criada com sucesso!");

      // Resetar o formulário
      setItensVenda([]);
      setProdutoId("");
      setQuantidade(1);
    } catch (error) {
      toast.error("Erro ao criar venda.");
      console.error(error);
    }
  };

  return (
    <main className={styles.container}>
      <h1>Criar Nova Venda</h1>
      <form onSubmit={enviarVenda} className={styles.form}>
        <div className={styles.produtoAdd}>
          <select
            className={styles.input}
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} - R${Number(p.valor).toFixed(2)}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            placeholder="Quantidade"
            className={styles.input}
          />

          <button type="button" onClick={adicionarProduto}>
            Adicionar
          </button>
        </div>

        <ul className={styles.listaProdutos}>
          {itensVenda.map((item, index) => (
            <li key={index} className={styles.itemVenda}>
              {item.nome} - {item.quantidade}x R${item.valor.toFixed(2)}{" "}
              <button type="button" onClick={() => removerProduto(index)}>
                Remover
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.total}>Total: R${calcularTotal().toFixed(2)}</p>

        <Button nome="Confirmar Venda" />
      </form>
    </main>
  );
}

"use client";

import styles from './styles.module.scss';
import {X} from 'lucide-react';
import {use} from 'react';
import {VendaContext} from "@/providers/venda";
import {calcularTotalVenda} from "@/lib/helper";

export function ModalVendaExibir(){

    const {onRequestClose, venda} = use(VendaContext);


    return(
       <dialog className={styles.dialogContainer}>

     <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#FF3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            # ID da Compra <b>{venda[0].venda.id}</b>
          </span>

          {venda.map((item) => (
            <section className={styles.item} key={item.id}>
            <img src={`http://localhost:3333/files/${item.produto.imagem}`} 
              width={50}
              height={50}
            />
            <span>Produto: <b>{item.produto.nome}</b> - Valor: <b>R$ {parseFloat(item.produto.valor).toFixed(2)}</b></span>
            <span>Quantidade: {item.quantidade}</span>
          </section>
          ))}

          <h3>Valor total do pedido: <b>R$ {calcularTotalVenda(venda).toFixed(2)}</b></h3>

        </article>

     </section>

    </dialog>
    )
}
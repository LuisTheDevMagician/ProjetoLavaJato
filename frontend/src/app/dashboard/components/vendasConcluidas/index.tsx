"use client";

import {use} from 'react';
import styles from './styles.module.scss';
import {RefreshCw} from 'lucide-react';
import {VendaProipiedads} from "@/lib/venda.type";
import {ModalVendaExibir} from "@/app/dashboard/components/modalExibir";
import {VendaContext} from "@/providers/venda";


interface Propiedades{
    vendas: VendaProipiedads[];
}

export function VendasConcluidas({vendas}: Propiedades){

    const {isOpen, onRequestOpen} = use(VendaContext);

    async function handleDetailOrder(vendaId: number){
        await onRequestOpen(vendaId);
    }

    return(
    <>
        <main className={styles.container}>

            <section className={styles.containerHeader}>
                <h1>Histórico de Compras</h1>
            </section>

            <section className={styles.listVendas}>
                {vendas.map((venda) => (
                    <button key={venda.id} className={styles.vendaItem}
                    onClick={() => handleDetailOrder(venda.id)}
                    > 
                        <div className={styles.tag}></div>
                        <span>Venda # {venda.id}</span>
                    </button>
                ))}
            </section>
        </main>

        {isOpen && <ModalVendaExibir />}
    </>
    )
}
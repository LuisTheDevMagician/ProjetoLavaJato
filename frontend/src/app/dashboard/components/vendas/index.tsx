"use client";

import {use} from 'react';
import styles from './styles.module.scss';
import {RefreshCw} from 'lucide-react';
import {VendaProipiedads} from "@/lib/venda.type";
import {ModalVenda} from "@/app/dashboard/components/modal";
import {VendaContext} from "@/providers/venda";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


interface Propiedades{
    vendas: VendaProipiedads[];
}

export function Vendas({vendas}: Propiedades){

    const {isOpen, onRequestOpen} = use(VendaContext);
    const router = useRouter();

    async function handleDetailOrder(vendaId: number){
        await onRequestOpen(vendaId);
    }

    async function handleRefresh() {
        router.refresh();
        toast.success('Lista de Compras atualizada com sucesso!');
    }

    return(
    <>
        <main className={styles.container}>

            <section className={styles.containerHeader}>
                <h1>Compras Pendentes</h1>
                <button onClick={handleRefresh}>
                    <RefreshCw size={20} color="#000" />
                </button>
            </section>

            <section className={styles.listVendas}>
                    {vendas.length === 0 && (
                        <span>
                            Nenhuma Compra Pendente no Momento
                        </span>
                    )}


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

        {isOpen && <ModalVenda />}
    </>
    )
}
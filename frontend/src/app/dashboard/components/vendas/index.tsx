import styles from './styles.module.scss';
import {RefreshCw} from 'lucide-react';
import {VendaProipiedads} from "@/lib/venda.type";
import {ModalVenda} from "@/app/dashboard/components/modal";


interface Propiedades{
    vendas: VendaProipiedads[];
}

export function Vendas({vendas}: Propiedades){
    return(
    <>
        <main className={styles.container}>

            <section className={styles.containerHeader}>
                <h1>Últimas Compras</h1>
                <button>
                    <RefreshCw size={20} color="#000" />
                </button>
            </section>

            <section className={styles.listVendas}>
                {vendas.map((venda) => (
                    <button key={venda.id} className={styles.vendaItem}>
                        <div className={styles.tag}></div>
                        <span>Venda # {venda.id}</span>
                    </button>
                ))}
            </section>
        </main>

        <ModalVenda />
    </>
    )
}
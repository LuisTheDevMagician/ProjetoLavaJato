"use client"
import {createContext, ReactNode, useState} from 'react';
import {api} from "@/services/api";
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import {useRouter} from "next/navigation";

export interface VendaProdutosProps{
    id: number;
    quantidade: number;
    created_at: string;
    vendaId: number;
    produtoId: number;
    produto: {
        id: number;
        nome: string;
        valor: string;
        quantidade: number;
        imagem: string;
        categoriaProdutoId: number;
    };
    venda: {
        id: number;
        valorTotal: string;
        status: boolean;
        draft: boolean;
        clienteId: number;
    };
}


type VendaContextData = {
    isOpen: boolean;
    onRequestOpen: (VendaId: number) => Promise<void>;
    onRequestClose: () => void;
    venda: VendaProdutosProps[];
    finalizarVenda: (vendaId: number) => Promise<void>;
}

type VendaProviderProps = {
    children: ReactNode;
}

export const VendaContext = createContext({} as VendaContextData);


export function VendaProvider({children}: VendaProviderProps){
const [isOpen, setIsOpen] = useState(false);
const [venda, setVenda] = useState<VendaProdutosProps[]>([]);
const router = useRouter();

async function onRequestOpen(VendaId: number){

    console.log(VendaId);

    const token =  await getCookieClient();

    const response = await api.get("/detalheVenda",{
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            vendaId : VendaId
        }
    });

    console.log(response.data);
    
    setVenda(response.data);


    setIsOpen(true);
}

function onRequestClose(){
    setIsOpen(false);
}

async function finalizarVenda(vendaId: number){
    const token = await getCookieClient();

    const data = {
        id: vendaId
    }

    try{
        await api.put("/concluirVenda", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }catch (error) {
        console.log(error);
        toast.error("Erro ao concluir o pedido!");
        return;
    }

    toast.success("Pedido concluído com sucesso!");
    router.refresh();
    setIsOpen(false);

}

    return(
        <VendaContext.Provider value={{
            isOpen,
            onRequestOpen,
            onRequestClose,
            venda,
            finalizarVenda
        }}>
            {children}
        </VendaContext.Provider>
    )
}


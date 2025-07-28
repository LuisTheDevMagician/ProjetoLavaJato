import {VendaProdutosProps} from "@/providers/venda"


export function calcularTotalVenda(vendas: VendaProdutosProps[]) {
    return vendas.reduce((total, item) => {
        const valorItemTotal = parseFloat(item.produto.valor) * item.quantidade;
        return total + valorItemTotal as number;
    }, 0);

}
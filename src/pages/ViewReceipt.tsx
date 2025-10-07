import { useEffect, useState } from "react";

type Receipt = {
    receiptId: number;
    clientId: number;
    date: string;
    totalBruto: number;
    desconto: number;
    acrescimo: number;
    totalLiquido: number;
}
type ReceiptService = {
    id: number;
    receiptId: number;
    serviceId: number;
    qtd: number;
    valueUnitario: number;
    valueTotal: number;
}

const ViewReceipt = () => {

    const [receipt, setReceipt] = useState<Receipt | null>(null)
    const [receiptService, setReceiptService] = useState<ReceiptService | null>(null)

    useEffect(() => {
        (async () => {
            const data = await (window as any).services.all();
            setReceipt(data);
        })();
    }, []);


    return (
        <>
            teste
        </>
    )
}

export default ViewReceipt;
import { ButtonReturn } from "../../components/Button";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    const { id } = useParams();


    const [receipt, setReceipt] = useState<Receipt | null>(null)
    const [receiptService, setReceiptService] = useState<ReceiptService[]>([])

    useEffect(() => {
        (async () => {
            const data = await (window as any).receipt_services.getById(Number(id));
            setReceiptService(data);
        })();
    }, [id]);

    return (
        <>
            <ButtonReturn />
            <Title title="Detalhes da Nota" subtitle={"Nota: " + id?.padStart(4, "0")}/>
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Quantidade</th>
                                    <th scope="col" className="px-6 py-3">Valor Unitário</th>
                                    <th scope="col" className="px-6 py-3 text-center">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {receiptService.map((service, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {service.serviceId}
                                        </td>
                                        <td>{service.qtd}</td>
                                        <td>{
                                            new Intl.NumberFormat("ptt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(service.valueUnitario / 100)
                                        }</td>
                                        <td>{
                                            new Intl.NumberFormat("ptt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(service.valueTotal / 100)
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewReceipt;
import { ButtonReturn } from "../../components/Button";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ReceiptService } from "../../types/global";



const ViewReceipt = () => {

    const { id, value } = useParams();


    // const [receipt, setReceipt] = useState<Receipt | null>(null)
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
            <Title title="Detalhes da Nota" subtitle={"Nota: " + id?.padStart(4, "0")} />
            <div className="max-w-7xl mx-auto p-8">
                <h2 className="text-2xl my-2">Serviço da Nota</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-600">
                            <thead className="text-xs text-text-primary uppercase bg-accent-primary">
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
                                            {service.serviceId.toString().padStart(4, "0")}
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
                                <tr>
                                    <td className="px-6 py-4  font-bold text-gray-900 whitespace-nowrap">Total</td>
                                    <td></td>
                                    <td></td>
                                    <td className="font-bold text-gray-900">{new Intl.NumberFormat("ptt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(value) / 100)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewReceipt;
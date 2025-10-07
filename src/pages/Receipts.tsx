import { useEffect, useState } from "react";
import Title from "../components/Title";
import { ButtonView } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

type Receipt = {
    receiptId: number,
    clientId: number,
    clientName: string,
    date: string,
    totalLiquido: number,
}



const Receipt = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [receipt, setReceipt] = useState<Receipt[]>([])

    useEffect(() => {
        (async () => {
            const r = await (window as any).receipt.all();
            setReceipt(r);
        })();
    }, []);


    return (
        <>
            <Title title="Notas" subtitle="visualize todas as notas." />
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Cliente</th>
                                    <th scope="col" className="px-6 py-3">Valor Total</th>
                                    <th scope="col" className="px-6 py-3">Data</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {receipt.map((r, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {r.receiptId.toString().padStart(4, "0")}
                                        </td>
                                        <td className="px-6 py-4">{r.clientName}</td>
                                        <td className="px-6 py-4">{
                                            new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(r.totalLiquido)

                                        }</td>
                                        <td className="px-6 py-4">{r.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <ButtonView textMain="Informações da Nota" onClick={() => { navigate(`/receipts/view/${r.receiptId}`) }} />
                                                {/* <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true)
                                                        getId = c.clientId
                                                    }
                                                } /> */}
                                            </div>
                                        </td>
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

export default Receipt;
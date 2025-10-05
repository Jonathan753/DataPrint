import { useEffect, useState } from "react";
import Title from "../components/Title";

type Receipt = {
    receiptId: number,
    clientId: number,
    date: string,
    totalBruto: number,
    desconto: number,
    acrescimo: number,
    totalLiquido: number,
}



const Receipt = () => {

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
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {receipt.map((r, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {r.receiptId}
                                        </td>
                                        <td className="px-6 py-4">{r.clientId}</td>
                                        <td className="px-6 py-4">{r.totalBruto}</td>
                                        <td className="px-6 py-4">{r.date}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-4">
                                                {/* <ButtonView textMain="Ver dados do cliente" onClick={() => navigate(`/client/view/${c.clientId}`)} />
                                                <ButtonNota textMain="Criar Nota" onClick={() => navigate(`/modelo/${c.clientId}`)} />
                                                <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true)
                                                        getId = c.clientId
                                                    }
                                                } />
                                                <ButtonUpdate textMain="Editar Cliente" onClick={() => navigate(`/client/edit/${c.clientId}`)} /> */}
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
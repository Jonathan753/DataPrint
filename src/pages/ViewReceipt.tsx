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
            <table>
                <thead>
                    <tr>

                        <th scope="col" className="px-6 py-3">Código</th>
                        <th scope="col" className="px-6 py-3">Quantidade</th>
                        <th scope="col" className="px-6 py-3">Valaor Único</th>
                        <th scope="col" className="px-6 py-3 text-center">Valor Total</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {receiptService.map((s, idx) => (
                        <tr key={idx} className="bg-white hover:bg-gray-50">
                            
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {s.serviceId}
                            </td>
                            <td>{s.qtd}</td>

                            <td>{s.valueUnitario}</td>
                            <td>{s.valueTotal}</td>
                            {/* <td className="px-6 py-4">
                            <div className="flex justify-center items-center gap-4">
                            
                            <ButtonDelete textMain="Excluir CLiente" onClick={
                                () => {
                                    setModalOpen(true);
                                    getId = service.serviceId;
                                    }

                                    } />
                                <ButtonUpdate textMain="Editar Serviço" onClick={() => navigate(`/service/edit/${service.serviceId}`)} />
                                </div>
                        </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ViewReceipt;
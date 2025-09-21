import { useEffect, useState } from "react";
import ButtonDelete from "../components/ButtonDelete";
import ButtonUpdate from "../components/ButtonUpdate";
import Title from "../components/Title"

type Service = {
    serviceId: number,
    service: string;
    value: number;
}

const ServiceList = () => {

    const [form, setForm] = useState<Service[]>([]);
    useEffect(() => {
        (async () => {
            const data = await (window as any).services.all();
            setForm(data);
        })();
    }, []);

    return (
        <>
            <Title title="Lista de Servicos" />
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Lista de Clientes</h1>
                    <p className="text-gray-500 mt-1">Visualize e gerencie os serviços cadastrados.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Serviço/Produto</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {form.map((service, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {service.serviceId}
                                        </td>
                                        <td>{service.service}</td>
                                        <td>{
                                            new Intl.NumberFormat("ptt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(service.value / 100)
                                        }</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    async () => {
                                                        await (window as any).services.delete(service.serviceId);
                                                        setForm(form.filter(ser => ser.serviceId !== service.serviceId));
                                                    }
                                                } />
                                                <ButtonUpdate textMain="Editar Cliente" />
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

export default ServiceList;
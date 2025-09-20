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
            <table className="border-separate w-full border-spacing-2 border border-gray-400 dark:border-gray-500">
                <thead>

                    <tr className="text-left">
                        <th>Código</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {form.map((service, idx) => (
                        <tr key={idx}>
                            <td>{service.serviceId}</td>
                            <td>{service.service}</td>
                            <td>{
                                new Intl.NumberFormat("ptt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(service.value / 100)
                            }</td>
                            <td><ButtonDelete onClick={
                                async () => {
                                    await (window as any).services.delete(service.serviceId);
                                    setForm(form.filter(ser => ser.serviceId !== service.serviceId));
                                }
                            } /></td>
                            <td><ButtonUpdate /></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default ServiceList;
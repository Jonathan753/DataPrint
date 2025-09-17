import { useEffect, useState } from "react";
import ButtonDelete from "../components/ButtonDelete";
import ButtonUpdate from "../components/ButtonUpdate";
import Title from "../components/Title"

type Service = {
    id:  number,
    service: string;
    value: string;
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
            <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
                <thead>

                    <tr className="">
                        <th></th>
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
                            <td>{service.id}</td>
                            <td>{service.service}</td>
                            <td>{service.value}</td>
                            <td><ButtonDelete /></td>
                            <td><ButtonUpdate /></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default ServiceList;
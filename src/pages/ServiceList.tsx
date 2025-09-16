import { useEffect, useState } from "react";
import ButtonDelete from "../components/ButtonDelete";
import ButtonUpdate from "../components/ButtonUpdate";
import Title from "../components/Title"

type Service = {
    id:  number,
    servico: string;
    value: string;
}


const ServiceList = () => {
    const [clients, setClients] = useState<Service[]>([]);

    useEffect(() => {
        (async () => {
            const data = await (window as any).services.all();
            setClients(data);
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
                    {clients.map((c, idx) => (
                        <tr key={idx}>
                            <td>{c.id}</td>
                            <td>{c.servico}</td>
                            <td>{c.value}</td>
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
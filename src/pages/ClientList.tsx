import { useNavigate } from "react-router-dom";
import ButtonDelete from "../components/ButtonDelete";
import ButtonNota from "../components/ButtonNota";
import ButtonUpdate from "../components/ButtonUpdate";
import Title from "../components/Title"
import { useState, useEffect } from "react";


type Clients = {
    clientId: number;
    cnpj_cpf: string;
    name: string;
    company: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    complement: string;
    phone: string;
    cell: string
}
const ClientList = () => {
    
    const [clients, setClients] = useState<Clients[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await (window as any).clients.all();
            setClients(data);
        })();
    }, []);



    return (
        <>
            <Title title="Lista de Clientes" />
            <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
                <thead>

                    <tr className="">
                        <th></th>
                        <th>Cliente</th>
                        <th>CNPJ/CPF</th>
                        <th>Cidade</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((c, idx) => (
                        <tr key={idx}>
                            <td>{c.clientId}</td>
                            <td>{c.name}</td>
                            <td>{c.cnpj_cpf}</td>
                            <td>{c.city}</td>
                            <td><ButtonNota onClick={() => navigate(`/modelo/${c.clientId}`)} /></td>
                            <td><ButtonDelete /></td>
                            <td><ButtonUpdate /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ClientList;
import { useNavigate } from "react-router-dom";
import ButtonDelete from "../components/ButtonDelete";
import ButtonNota from "../components/ButtonNota";
import ButtonUpdate from "../components/ButtonUpdate";
import Title from "../components/Title"
import { useState, useEffect } from "react";


type Client = {
    id: number;
    cnpj_cpf: string;
    name: string;
    razao: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    complemento: string;
    phone: string;
    cell: string
}
const ClientList = () => {
    
    const [clients, setClients] = useState<Client[]>([]);
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
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.cnpj_cpf}</td>
                            <td>{c.city}</td>
                            <td><ButtonNota onClick={() => navigate(`/modelo/${c.id}`)} /></td>
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
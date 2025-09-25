import { useNavigate, useParams } from "react-router-dom";
import { ButtonDelete, ButtonNota, ButtonUpdate, ButtonView } from "../components/Button";
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

    const { id } = useParams();

    const [clients, setClients] = useState<Clients[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await (window as any).clients.all();
            setClients(data);
        })();
    }, [id]);


    return (
        <>
            <Title title="Lista de Clientes" subtitle="Visualize e gerencie os clientes cadastrados." />
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nome</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Celular</th>
                                    <th scope="col" className="px-6 py-3">Cidade</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {clients.map((c, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {c.name}
                                        </td>
                                        <td className="px-6 py-4">{c.email}</td>
                                        <td className="px-6 py-4">{c.phone}</td>
                                        <td className="px-6 py-4">{c.city}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <ButtonView textMain="Ver dados do cliente" />
                                                <ButtonNota textMain="Criar Nota" onClick={() => navigate(`/modelo/${c.clientId}`)} />
                                                <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    async () => {
                                                        await (window as any).clients.delete(c.clientId);
                                                        setClients(clients.filter(cl => cl.clientId !== c.clientId));
                                                    }
                                                } />
                                                <ButtonUpdate textMain="Editar Cliente"
                                                    onClick={async () => {
                                                        const novoNome = prompt("Digite o novo nome:", c.name);
                                                        if (novoNome) {
                                                            await (window as any).clients.update({
                                                                ...c,
                                                                name: novoNome,
                                                            });
                                                            setClients(clients.map(cl =>
                                                                cl.clientId === c.clientId ? { ...cl, name: novoNome } : cl
                                                            ));
                                                        }
                                                    }} />
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

export default ClientList;
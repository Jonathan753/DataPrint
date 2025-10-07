import { useNavigate, useParams } from "react-router-dom";
import { ButtonDelete, ButtonNota, ButtonReturn, ButtonUpdate, ButtonView } from "../components/Button";
import Title from "../components/Title"
import { useState, useEffect } from "react";
import { ModalDelete } from "../components/Modal";

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

let getId = 0;

const ClientList = () => {

    const { id } = useParams();

    const [clients, setClients] = useState<Clients[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await (window as any).clients.all();
            setClients(data);
        })();
    }, [id]);


    return (
        <>
            <ButtonReturn />
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
                                                <ButtonView textMain="Ver dados do cliente" onClick={() => navigate(`/client/view/${c.clientId}`)} />
                                                <ButtonNota textMain="Criar Nota" onClick={() => navigate(`/modelo/${c.clientId}`)} />
                                                <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true)
                                                        getId = c.clientId
                                                    }
                                                } />
                                                <ButtonUpdate textMain="Editar Cliente" onClick={() => navigate(`/client/edit/${c.clientId}`)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalDelete
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onDelete={
                        async () => {
                            await (window as any).clients.delete(getId);
                            setClients(clients.filter(cl => cl.clientId !== getId));
                        }
                    }
                    title="Tem certeza que quer excluir o cliente?"
                    message="Essa ação será irreversível!"
                />
            </div>
        </>
    )
}

export default ClientList;
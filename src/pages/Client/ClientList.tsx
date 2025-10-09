import { useNavigate } from "react-router-dom";
import { ButtonDelete, ButtonNota, ButtonReturn, ButtonUpdate, ButtonView } from "../../components/Button";
import Title from "../../components/Title"
import { useState } from "react";
import { ModalDelete } from "../../components/Modal";
import type { Client } from "../../types/global";
import { useDatabaseQueryAll } from "../../hooks/useDatabaseQueryAll";


let getId = 0;

const ClientList = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const query = (window as any).clients.all();
    const { data: client, isLoading, error } = useDatabaseQueryAll<Client[]>(() => query);

    if (isLoading) {
        return <p>Carregando Clientes...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }


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
                                {client && client.map((c, idx) => (
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
                                                {/* <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true)
                                                        getId = c.clientId
                                                    }
                                                } /> */}
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
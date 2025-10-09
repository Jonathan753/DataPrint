import { useNavigate } from "react-router-dom";
import { ButtonDelete, ButtonNota, ButtonReturn, ButtonUpdate, ButtonView } from "../../components/Button";
import Title from "../../components/Title"
import { useCallback, useEffect, useState } from "react";
import { ModalDelete } from "../../components/Modal";
import type { Client } from "../../types/global";
import { useDatabaseQueryAll } from "../../hooks/useDatabaseQueryAll";
import Input from "../../components/Input";


let getId = 0;
const ITEMS_PER_PAGE = 10; // Defina quantos itens por página você quer

const ClientList = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchClients = useCallback(async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const result = await (window as any).clients.all({
                page: page,
                limit: ITEMS_PER_PAGE,
                searchTerm: search,
            });

            setClients(result.data);
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {

        const handler = setTimeout(() => {
            fetchClients(currentPage, searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [currentPage, searchTerm, fetchClients]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <ButtonReturn />
            <Title title="Lista de Clientes" subtitle="Visualize e gerencie os clientes cadastrados." />
            <div className="max-w-7xl mx-auto p-8">
                <div className="mb-4">

                    <Input type="text" onChange={handleSearchChange} value={searchTerm} label="Filtro" id="filtro" gridClass="w-96" placeholder="Buscar por nome do cliente..." />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-text-primary uppercase bg-accent-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Cliente</th>
                                    <th scope="col" className="px-6 py-3">Telefone</th>
                                    <th scope="col" className="px-6 py-3">CPF/CNPJ</th>
                                    <th scope="col" className="px-6 py-3 text-center">Email</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr><td colSpan={5} className="text-center p-4">Carregando...</td></tr>
                                ) : clients.length > 0 ? (
                                    clients.map((c) => (
                                        <tr key={c.clientId} className="bg-white hover:bg-gray-200">

                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {c.clientId.toString().padStart(4, "0")}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {c.name}
                                            </td>
                                            <td className="px-6 py-4">{c.cell}</td>
                                            <td className="px-6 py-4">{
                                                c.cnpj_cpf
                                            }</td>
                                            <td className="px-6 py-4">{c.email}</td>
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
                                    ))
                                ) : (
                                    <tr><td colSpan={5} className="text-center p-4">Nenhuma nota encontrada.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {totalPages > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isLoading}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span>
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || isLoading}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                )}
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
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ButtonReturn, ButtonUpdate } from "../../components/Button";
import Title from "../../components/Title";
import type { Service } from "../../types/global";
import Input from "../../components/Input";


let getId = 0;
const ITEMS_PER_PAGE = 10;

const ServiceList = () => {

    const [service, setService] = useState<Service[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchClients = useCallback(async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const result = await (window as any).services.all({
                page: page,
                limit: ITEMS_PER_PAGE,
                searchTerm: search,
            });

            setService(result.data);
            // Calcula o total de páginas com base no total de itens retornados
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Efeito para buscar os dados quando a página ou o filtro mudarem
    useEffect(() => {
        // Debounce: espera o usuário parar de digitar por 300ms antes de buscar
        const handler = setTimeout(() => {
            fetchClients(currentPage, searchTerm);
        }, 300);

        // Limpa o timeout se o usuário digitar novamente
        return () => {
            clearTimeout(handler);
        };
    }, [currentPage, searchTerm, fetchClients]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reseta para a primeira página ao fazer uma nova busca
    };

    return (
        <>
            <ButtonReturn />
            <Title title="Lista de Servicos" subtitle="Visualize e gerencie os serviços/produtos cadastrados." />
            <div className="max-w-7xl mx-auto p-8">
                <div className="mb-4">

                    <Input type="text" onChange={handleSearchChange} value={searchTerm} label="Filtro" id="filtro" gridClass="w-96" placeholder="Buscar por nome do cliente..." />
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            {/* ... seu thead continua o mesmo ... */}
                            <thead className="text-xs text-text-primary uppercase bg-accent-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Serviço/Prod.</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr><td colSpan={5} className="text-center p-4">Carregando...</td></tr>
                                ) : service.length > 0 ? (
                                    service.map((s) => (
                                        <tr key={s.serviceId} className="bg-white hover:bg-gray-200">

                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {s.serviceId.toString().padStart(4, "0")}
                                            </td>
                                            <td className="px-6 py-4 ">
                                                {s.service}
                                            </td>
                                            <td className="px-6 py-4">{
                                                new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(s.value / 100)
                                            }</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center items-center gap-4">
                                                    <ButtonUpdate textMain="Editar Serviço" onClick={() => navigate(`/service/edit/${s.serviceId}`)} />
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
            </div>
        </>
    )
}

export default ServiceList;
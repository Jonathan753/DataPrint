import { useEffect, useState, useCallback } from "react";
import Title from "../../components/Title";
import { ButtonView } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";

type Receipt = {
    receiptId: number,
    clientId: number,
    clientName: string,
    date: string,
    totalLiquido: number,
}

const ITEMS_PER_PAGE = 10;

const Receipt = () => {
    const navigate = useNavigate();

    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReceipts = useCallback(async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const result = await (window as any).receipt.paginated({
                page: page,
                limit: ITEMS_PER_PAGE,
                searchTerm: search,
            });

            setReceipts(result.data);
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        const handler = setTimeout(() => {
            fetchReceipts(currentPage, searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [currentPage, searchTerm, fetchReceipts]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <Title title="Notas" subtitle="Visualize todas as notas." />
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
                                    <th scope="col" className="px-6 py-3">Cliente</th>
                                    <th scope="col" className="px-6 py-3">Valor Total</th>
                                    <th scope="col" className="px-6 py-3">Data</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {isLoading ? (
                                    <tr><td colSpan={5} className="text-center p-4">Carregando...</td></tr>
                                ) : receipts.length > 0 ? (
                                    receipts.map((r) => (
                                        <tr key={r.receiptId} className="bg-white hover:bg-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {r.receiptId.toString().padStart(4, "0")}
                                            </td>
                                            <td className="px-6 py-4">{r.clientName}</td>
                                            <td className="px-6 py-4">{
                                                new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(r.totalLiquido)
                                            }</td>
                                            <td className="px-6 py-4">{r.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center items-center gap-4">
                                                    <ButtonView textMain="Informações da Nota" onClick={() => navigate(`/receipts/view/${r.receiptId}`)} />
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

export default Receipt;
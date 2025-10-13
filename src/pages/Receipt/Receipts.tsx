import Title from "../../components/Title";
import { ButtonNota, ButtonView } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { useDatabaseQueryPage } from "../../hooks/useDatabaseQueryPage";

type Receipt = {
    receiptId: number,
    clientId: number,
    clientName: string,
    date: string,
    totalLiquido: number,
    totalBruto: number,
}

const ITEMS_PER_PAGE = 10;

const Receipt = () => {
    const navigate = useNavigate();

    const {
        data: receipts,
        isLoading,
        totalPages,
        handleSearchChange,
        searchTerm,
        currentPage,
        setCurrentPage
    } = useDatabaseQueryPage<Receipt>(
        (props) => (window as any).receipt.paginated(props),
        ITEMS_PER_PAGE
    );

    const handleConverteDate = (data: string) => {
        let d = new Date(data)
        return d.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }


    return (
        <>
            <Title title="Notas" subtitle="Visualize todas as notas." />
            <div className="max-w-7xl mx-auto p-8">
                <div className="mb-4">

                    <Input type="text" onChange={handleSearchChange} value={searchTerm} label="Filtro" id="filtro" gridClass="max-w-96" placeholder="Buscar por nome do cliente..." />
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-text-primary uppercase bg-accent-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Código</th>
                                    <th scope="col" className="px-6 py-3">Cliente</th>
                                    <th scope="col" className="px-6 py-3">Valor Total</th>
                                    <th scope="col" className="px-6 py-3">Data/Hora</th>
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
                                            <td className="px-6 py-4 text-nowrap">{r.clientName}</td>
                                            <td className="px-6 py-4">{
                                                new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(r.totalLiquido)
                                            }</td>
                                            <td className="px-6 py-4">{handleConverteDate(r.date)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center items-center gap-4">
                                                    <ButtonView textMain="Informações da Nota" onClick={() => navigate(`/receipts/view/${r.receiptId}/${r.totalBruto}`)} />
                                                    <ButtonNota textMain="Criar Nota" onClick={() => navigate(`/receipts/view/template/${r.clientId}/${r.receiptId}`)} />
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
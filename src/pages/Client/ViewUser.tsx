import { useState, useEffect, useCallback } from "react";
import Title from "../../components/Title";
import { ButtonReturn } from "../../components/Button";
import { useParams } from "react-router-dom";
import ViewData from "../../components/ViewData";
import type { Client, Receipt } from "../../types/global";
import { useDatabaseQueryPage } from "../../hooks/useDatabaseQueryPage";
import Input from "../../components/Input";

// type Receipt = {
//     receiptId: number,
//     clientId: number,
//     clientName: string,
//     date: string,
//     totalLiquido: number,
// }
const ITEMS_PER_PAGE = 3;

const ViewUser = () => {
    const { id } = useParams();

    const [client, setClient] = useState<Client | null>(null);
    const [receipt, setReceipt] = useState<Receipt[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const c = await (window as any).clients.getById(Number(id));
            const r = await (window as any).receipt.getClient(Number(id));
            setClient(c);
            setReceipt(r);
        })();
    }, [id]);

    ////
    // const [receipts, setReceipts] = useState<Receipt[]>([]);
    // const [searchTerm, setSearchTerm] = useState("");

    const fetchReceipts = useCallback(async (page: number, id:string|undefined) => {
        setIsLoading(true);
        try {
            const result = await (window as any).receipt.client({
                page: page,
                limit: ITEMS_PER_PAGE,
                id: Number(id),
            });
            console.log("ponto 1")
            setReceipt(result.data);
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
            console.log("ponto 2")
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        const handler = setTimeout(() => {
            console.log(id)
            fetchReceipts(currentPage, id);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [currentPage, id, fetchReceipts]);

    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    //     setCurrentPage(1);
    // };

    ////


    if (!client) return <p>Carregando...</p>;
    return (
        <>
            <ButtonReturn />
            <Title title="Dados do Cliente" subtitle="Visualize as informaçoes: "  />
            <div className="p-8 ">
                <div className="flex gap-5 m-auto md:justify-center w-4/5 flex-col md:flex-row">
                    <div className="border-border min-w-[300px] w-full max-w-[400px] bg-background-surface shadow-md rounded-lg p-4 ">
                        <h2 className="text-center text-lg border-b border-black py-1">Indetificação</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">

                            <ViewData info="Nome:" data={client.name} />
                            <ViewData info="Razão Social:" data={client.company} />
                            <ViewData info="CNPJ/CPF:" data={client.cnpj_cpf} />
                        </div>
                    </div>
                    <div className="border-border min-w-[300px] w-full max-w-[400px] bg-background-surface shadow-md rounded-lg p-4" >
                        <h2 className="text-center text-lg border-b border-black py-1">Logradouro</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">

                            <ViewData info="Endereço:" data={client.adress} />
                            <ViewData info="N:" data={client.number} />
                            <ViewData info="Bairro:" data={client.neighborhood} />
                            <ViewData info="Cidade:" data={client.city} />
                            <ViewData info="UF:" data={client.uf} />
                            <ViewData info="CEP:" data={client.cep} />
                            <ViewData info="Complemento:" data={client.complement} />
                        </div>
                    </div>
                    <div className="border-border min-w-[300px] w-full max-w-[400px] bg-background-surface shadow-md rounded-lg p-4">
                        <h2 className="text-center text-lg border-b border-black py-1">Contato</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">
                            <ViewData info="E-mail:" data={client.email} />
                            <ViewData info="Telefone:" data={client.phone} />
                            <ViewData info="Celular:" data={client.cell} />
                        </div>
                    </div>
                </div>
                <div className="w-3/5 mx-auto">
                        <h2 className="text-2xl my-2">Notas do Cliente</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-text-primary uppercase bg-accent-primary">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Código</th>
                                        <th scope="col" className="px-6 py-3">Total Bruto</th>
                                        <th scope="col" className="px-6 py-3 text-center">Desconto</th>
                                        <th scope="col" className="px-6 py-3">Acrescimo</th>
                                        <th scope="col" className="px-6 py-3 text-center">Total Líquido</th>
                                        <th scope="col" className="px-6 py-3 text-center">Data/Hora</th>
                                        <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {receipt.length > 0 ? (
                                        receipt.map((r) => (
                                            <tr key={r.receiptId} className="bg-white hover:bg-gray-200">

                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {r.receiptId.toString().padStart(4, "0")}
                                                </td>
                                                <td className="px-6 py-4 ">{r.totalBruto}</td>
                                                <td className="px-6 py-4">{r.desconto}</td>
                                                <td className="px-6 py-4">{r.acrescimo}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{r.totalLiquido}</td>
                                                <td className="px-6 py-4">{r.date}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center items-center gap-4">
                                                        
                                                        {/* <ButtonView textMain="Ver dados do cliente" onClick={() => navigate(`/client/view/${c.clientId}`)} /> */}
                                                        {/* <ButtonNota textMain="Criar Nota" onClick={() => navigate(`/modelo/${c.clientId}`)} /> */}
                                                        {/* <ButtonDelete textMain="Excluir CLiente" onClick={
                                                    () => {
                                                        setModalOpen(true)
                                                        getId = c.clientId
                                                    }
                                                } /> */}
                                                        {/* <ButtonUpdate textMain="Editar Cliente" onClick={() => navigate(`/client/edit/${c.clientId}`)} /> */}
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
            </div>
        </>
    )
}

export default ViewUser;
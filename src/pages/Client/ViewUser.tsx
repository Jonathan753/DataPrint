import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { ButtonReturn } from "../../components/Button";
import { useParams } from "react-router-dom";
import ViewData from "../../components/ViewData";
import type { Client} from "../../types/global";
import { useDatabaseQueryPage } from "../../hooks/useDatabaseQueryPage";
import Input from "../../components/Input";

type Receipt = {
    receiptId: number,
    clientId: number,
    clientName: string,
    date: string,
    totalLiquido: number,
}
const ITEMS_PER_PAGE = 3;

const ViewUser = () => {
    let t =""
    const { id } = useParams();

    const [client, setClient] = useState<Client | null>(null);
    // const [receipt, setReceipt] = useState<Receipt[]>([]);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // setIsLoading(true);
            const c = await (window as any).clients.getById(Number(id));
            const r = await (window as any).receipt.getClient(Number(id));
            setClient(c);
            // setReceipt(r);
        })();
    }, [id]);

const {
        data: receipt, // Renomeamos 'data' para 'clients' para ficar mais claro
        isLoading,
        totalPages,
        handleSearchChange,
        searchTerm,
        currentPage,
        setCurrentPage,
        setSearchTerm
    } = useDatabaseQueryPage<Receipt>( // Especificamos que o item é do tipo 'Client'
        (props) => (window as any).receipt.paginated(props), // A função que busca os clientes
        ITEMS_PER_PAGE
    );

    // const {
    //     data: service, // Renomeamos 'data' para 'clients' para ficar mais claro
    //     isLoading,
    //     totalPages,
    //     handleSearchChange,
    //     searchTerm,
    //     currentPage,
    //     setCurrentPage
    // } = useDatabaseQueryPage<Service>( // Especificamos que o item é do tipo 'Client'
    //     (props) => (window as any).services.all(props), // A função que busca os clientes
    //     ITEMS_PER_PAGE
    // );
    useEffect(()=>{
        
        t = client?.name ?? "ts";
        setSearchTerm(t)
        console.log(t)
    },[t])
    
    if (!client) return <p>Carregando...</p>;
console.log(searchTerm)
    return (
        <>
            <ButtonReturn />
            <Title title="Dados do Cliente" subtitle="Visualize as informaçoes." />
            {/* <Input label="invisivel" onChange={handleSearchChange} value={searchTerm}/> */}
            <div className="p-8 ">
                <div className="flex gap-5 m-auto md:justify-center ">
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4 ">
                        <h2 className="text-center text-lg border-b border-black py-1">Indetificação</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">

                            <ViewData info="Nome:" data={client.name} />
                            <ViewData info="Razão Social:" data={client.company} />
                            <ViewData info="CNPJ/CPF:" data={client.cnpj_cpf} />
                        </div>
                    </div>
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4">
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
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4">
                        <h2 className="text-center text-lg border-b border-black py-1">Contato</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">
                            <ViewData info="E-mail:" data={client.email} />
                            <ViewData info="Telefone:" data={client.phone} />
                            <ViewData info="Celular:" data={client.cell} />
                        </div>
                    </div>
                </div>
                {/* TESTE */}
                <div className="w-full">
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
                                    {receipt.length > 0 ? (
                                        receipt.map((r) => (
                                            <tr key={r.receiptId} className="bg-white hover:bg-gray-200">

                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {r.receiptId.toString().padStart(4, "0")}
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    {r.clientId}
                                                </td>
                                                <td className="px-6 py-4">{r.totalLiquido}</td>
                                                <td className="px-6 py-4">{
                                                    r.date
                                                }</td>
                                                <td className="px-6 py-4">{
                                                    r.clientName
                                                }</td>
                                                
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
                </div>
            </div>
        </>
    )
}

export default ViewUser;
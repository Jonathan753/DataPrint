import { useState } from "react";

type Service = {
    id: number,
    servico: string;
    value: string;
}

type SelectService = Service & { qtd: number }

const SearchService = ({ onAdd }: { onAdd: (p: SelectService) => void }) => {
    const [produtos, setProdutos] = useState<Service[]>([]);
    const [termo, setTermo] = useState('');
    const [quantidade, setQuantidade] = useState<{ [id: number]: number }>({});

    async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTermo(value);

        if (value.length > 1) {
            const res = await (window as any).services.search(value);
            setProdutos(res);
        } else {
            setProdutos([]);
        }
    }

    function handleQuantidadeChange(id: number, value: string) {
        setQuantidade((prev) => ({
            ...prev,
            [id]: parseInt(value) || 1,
        }));
    }

    return (
        <>
            <input
                type="text"
                value={termo}
                onChange={handleSearch}
                placeholder="Buscar produto..."
                className="border p-2 rounded w-full"
            />

            {produtos.length > 0 && (
                <ul className="border mt-2 rounded bg-white shadow">
                    {produtos.map((p) => (
                        <li key={p.id} className="p-2 flex items-center gap-2 border-b">
                            <span className="flex-1">
                                {p.servico} — R$ {p.value}
                            </span>
                            <input
                                type="number"
                                min={1}
                                value={quantidade[p.id] || 1}
                                onChange={(e) => handleQuantidadeChange(p.id, e.target.value)}
                                className="w-16 border p-1 rounded"
                            />
                            <button
                                onClick={() => {
                                    onAdd({ ...p, qtd: quantidade[p.id] || 1 });
                                    setTermo("");       // limpa o campo
                                    setProdutos([]);  // limpa resultados
                                    setQuantidade({}); // reseta quantidades
                                }}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Adicionar
                            </button>
                        </li>
                    ))}
                </ul>

            )}

        </>
    )
}

export default SearchService;
import { useState } from "react";

type Service = {
    serviceId: number,
    service: string;
    value: number;
}

type SelectService = Service & { qtd: number }

const SearchService = ({ onAdd }: { onAdd: (p: SelectService) => void }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [termo, setTermo] = useState('');
    const [quantidade, setQuantidade] = useState<{ [id: number]: number }>({});

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTermo(value);

        if (value.length > 1) {
            const res = await (window as any).services.search(value);
            setServices(res);
        } else {
            setServices([]);
        }
    }

    const handleQuantidadeChange = (id: number, value: string) => {
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
                className="w-full px-3 py-2 border border-gray-400 text-white rounded-full shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-indigo-500
                    transition duration-150 ease-in-out bg-zinc-600 placeholder:text-gray-500"
            />

            {services.length > 0 && (
                <ul className="border mt-2 rounded bg-zinc-600 shadow">
                    {services.map((p) => (
                        <li key={p.serviceId} className="p-2 flex items-center gap-2 border-b">
                            <span className="flex-1">
                                {p.service} — {
                                    new Intl.NumberFormat("ptt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(p.value / 100)
                                }
                            </span>
                            <input
                                type="number"
                                min={1}
                                value={quantidade[p.serviceId] || 1}
                                onChange={(e) => handleQuantidadeChange(p.serviceId, e.target.value)}
                                className="w-16 border p-1 rounded"
                            />
                            <button
                                onClick={() => {
                                    onAdd({ ...p, qtd: quantidade[p.serviceId] || 1 });
                                    setTermo("");       // limpa o campo
                                    setServices([]);  // limpa resultados
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
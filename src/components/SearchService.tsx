import { useState } from "react";
import type { Service } from "../types/global";


type SelectService = Service & { qtd: number }

const SearchService = ({ onAdd }: { onAdd: (p: SelectService) => void }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [termo, setTermo] = useState('');
    const [quantidade, setQuantidade] = useState<{ [id: number]: number }>({});

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTermo(value);

        if (value.length > 0) {
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
                className="w-full px-3 py-2 border border-gray-600 text-text-primary rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-indigo-400
                    transition duration-150 ease-in-out bg-background-surface placeholder:text-gray-500
                    disabled:text-text-disabled disabled:border-gray-300"
            />

            {services.length > 0 && (
                <ul className="border mt-2 rounded bg-background-surface shadow">
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
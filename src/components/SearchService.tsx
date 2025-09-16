import { useState } from "react";

type Service = {
    id: number,
    servico: string;
    value: string;
}

const SearchService = ({ onAdd }: { onAdd: (p: Service) => void }) => {
    const [produtos, setProdutos] = useState<Service[]>([]);
    const [termo, setTermo] = useState('');

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
                        <li
                            key={p.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                onAdd(p);
                                setTermo("");       // limpa campo
                                setProdutos([]); // limpa lista
                            }}
                        >
                            {p.servico} — R$ {p.value}
                        </li>
                    ))}
                </ul>
            )}

        </>
    )
}

export default SearchService;
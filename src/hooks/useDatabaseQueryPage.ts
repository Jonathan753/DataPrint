import { useState, useEffect, useCallback } from 'react';

// <--- 1. Definimos os tipos que o hook vai usar internamente
// A função de busca receberá estes parâmetros
type QueryProps = {
    page: number;
    limit: number;
    searchTerm: string;
}

// A função de busca DEVE retornar uma Promise com este formato
type PaginatedResult<TItem> = {
    data: TItem[];
    totalItems: number;
}

// <--- 2. Tornamos o hook genérico em relação ao TIPO DO ITEM (TItem)
export function useDatabaseQueryPage<TItem>(
    // <--- 3. A função de busca agora tem uma tipagem clara e segura
    queryFunction: (props: QueryProps) => Promise<PaginatedResult<TItem>>,
    ITEMS_PER_PAGE: number,
) {
    // <--- 4. O estado 'data' agora sabe que é um array do tipo do item (ex: Client[] ou Receipt[])
    const [data, setData] = useState<TItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFunction = useCallback(async (page: number, search: string) => {
        setIsLoading(true);
        try {
            const result = await queryFunction({
                page: page,
                limit: ITEMS_PER_PAGE,
                searchTerm: search,
            });

            // Agora o TypeScript não reclama mais, pois ele sabe que 'result' tem 'data' e 'totalItems'
            setData(result.data);
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            // <--- 5. Mensagem de erro genérica
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    }, [ITEMS_PER_PAGE]); // Adicionado queryFunction e ITEMS_PER_PAGE às dependências

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchFunction(currentPage, searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [currentPage, searchTerm, fetchFunction]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // Retornamos todos os estados e funções que o componente precisa
    return { data, isLoading, totalPages, handleSearchChange, searchTerm, currentPage, setCurrentPage, setData};
}
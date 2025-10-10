import { useState, useEffect, useCallback } from 'react';
type Props = {
    page: number;
    limit: number;
    searchTerm: string;
}
export function useDatabaseQueryPage<T>(
    queryFunction: ({ page, limit, searchTerm }: Props) => Promise<T>,
    ITEMS_PER_PAGE: number,
) {
    const [data, setData] = useState<T | null>(null);
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

            setData(result.data);
            setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

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

    return { data, isLoading, totalPages, handleSearchChange };
}
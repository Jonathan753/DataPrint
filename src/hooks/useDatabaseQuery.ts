// Em src/hooks/useDatabaseQuery.ts

import { useState, useEffect } from 'react';

// T é um tipo genérico. Ele representa o tipo de dado que vamos buscar (Client[], Service[], etc.)
export function useDatabaseQuery<T>(queryFunction: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const executeQuery = async () => {
            // Resetamos o estado antes de cada nova execução
            setIsLoading(true);
            setError(null);
            try {
                const result = await queryFunction(); // Executa a função que foi passada como argumento
                setData(result);
            } catch (err) {
                console.error("Erro na query do banco de dados:", err);
                setError('Falha ao buscar dados.');
            } finally {
                setIsLoading(false);
            }
        };

        executeQuery();
    }, [queryFunction]); // Dependência da função de query

    // O hook retorna o estado para que o componente possa usá-lo
    return { data, isLoading, error };
}
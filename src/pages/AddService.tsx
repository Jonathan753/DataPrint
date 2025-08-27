import Input from "../components/Input";

const AddService = () => {
    return (
        <>
            
                <h1>Adicionar Serviço/Produto</h1>
                <form >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        <Input
                            gridClass="md:col-span-2"
                            label="Serviço/Produto"
                            id="servico_produto"
                            name="servico_produto"
                            type="text"
                            placeholder="Ex: Formatação de Notebook"
                        />
                        <Input
                            gridClass="md:col-span-1"
                            label="Valor (R$)"
                            id="valor"
                            name="valor"
                            type="number"
                            placeholder="150,00"
                            step="0.01" // Permite casas decimais para os centavos
                        />
                    </div>

                    {/* Botões do Formulário */}
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            
        </>
    )
}

export default AddService;
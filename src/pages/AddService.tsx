import { useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import ButtonSave from "../components/ButtonSave";

type Services = {
    service: string;
    value: string;
}

const AddService = () => {

    const [form, setForm] = useState<Services>({
        service: "",
        value: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await (window as any).services.add(form);
        setForm({ service: "", value: "" });
        alert("Serviço cadastrado com sucesso");
    }


    return (
        <>


            <Title title="Adicionar Serviço/Produto" />
            <form onSubmit={handleSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                    <Input
                        onChange={handleChange}
                        value={form.service}
                        gridClass="md:col-span-2"
                        label="Serviço/Produto"
                        id="service"
                        name="service"
                        type="text"
                        placeholder="Ex: Formatação de Notebook"
                    />

                    <Input
                        onChange={handleChange}
                        value={form.value}
                        gridClass="md:col-span-1"
                        label="Valor (R$)"
                        id="value"
                        name="value"
                        type="text"
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
                    <ButtonSave />
                </div>
            </form>

        </>
    )
}

export default AddService;
import { useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import { ButtonReset, ButtonSave } from "../components/Button";

type Services = {
    service: string;
    value: string;
}

const AddService = () => {

    const [form, setForm] = useState<Services>({
        service: "",
        value: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await (window as any).services.add(form);
        setForm({ service: "", value: "" });
        // alert("Serviço cadastrado com sucesso");
    }

    return (
        <>
            <Title title="Adicionar Serviço/Produto" />
            <div className="p-8">

                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
                        <Input
                            onChange={handleChange}
                            value={form.service??""}
                            gridClass="md:col-span-5"
                            label="Serviço/Produto"
                            id="service"
                            name="service"
                            type="text"
                            placeholder="Ex: Formatação de Notebook"
                        />

                        <Input
                            onChange={handleChange}
                            value={form.value??""}
                            gridClass="md:col-span-1"
                            label="Valor (R$)"
                            id="value"
                            name="value"
                            type="text"
                            placeholder="150,00"
                            step="0.01"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <ButtonReset onClick={
                            () => setForm({
                                service: "",
                                value: "",
                            })
                        } />
                        <ButtonSave />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddService;
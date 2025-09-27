import { useState, useEffect } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import { ButtonReset, ButtonSave } from "../components/Button";
import { useParams, useNavigate } from "react-router-dom";

type Services = {
    service: string;
    value: string;
}

const EditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [form, setForm] = useState<Services | null>(null);

    useEffect(() => {
        (async () => {
            const data = await (window as any).services.getById(Number(id));
            setForm(data);
        })();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form) return;
        const result = await (window as any).services.update(form);
        if (result && result.success) {
            // opcional: mostrar aviso
            alert("Serviço atualizado com sucesso!");
            navigate("/service-list"); // ajustar para a rota correta do App.tsx
        } else {
            console.error("Erro no update:", result);
            alert("Falha ao atualizar o Serviço. Veja console para detalhes.");
        }
    }

    if (!form) return <p>Carregando...</p>;

    return (
        <>
            <Title title="Editar Serviço/Produto" />
            <div className="p-8">

                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
                        <Input
                            onChange={handleChange}
                            value={form.service}
                            gridClass="md:col-span-5"
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
                            step="0.01"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <ButtonReset />
                        <ButtonSave />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditService;
import { useState } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { ButtonReset, ButtonReturn, ButtonSave } from "../../components/Button";
import { Modal } from "../../components/Modal";
import type { Service } from "../../types/global";


type Services = {
    service: string;
    value: number;
}

const AddService = () => {

    const [form, setForm] = useState<Service>({
        serviceId: 0,
        service: "",
        value: 0,
    });
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "value") {
            // tira vírgula, ponto etc.
            const numeric = value.replace(/\D/g, ""); // só números
            setForm((prev) => ({
                ...prev,
                value: numeric ? parseInt(numeric, 10) : 0, // guarda em centavos
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await (window as any).services.add(form);
        setForm({ service: "", value: 0 , serviceId: 0});
        setModalOpen(true); // abre modal em vez de alert
    }

    return (
        <>
            <ButtonReturn />
            <Title title="Adicionar Serviço/Produto" />
            <div className="p-8">

                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
                        <Input
                            onChange={handleChange}
                            value={form.service ?? ""}
                            gridClass="md:col-span-5"
                            label="Serviço/Produto"
                            id="service"
                            name="service"
                            type="text"
                            placeholder="Ex: Formatação de Notebook"
                        />

                        <Input
                            onChange={handleChange}
                            value={
                                form.value
                                    ? (form.value / 100).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                    : ""
                            }
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
                                serviceId: 0,
                                value: 0,
                            })
                        } />
                        <ButtonSave />
                    </div>
                </form>
                {/* Modal */}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Serviço cadastrado"
                    message="O serviço foi adicionado com sucesso!"
                />
            </div>
        </>
    )
}

export default AddService;
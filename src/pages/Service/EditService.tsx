import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { ButtonReset, ButtonReturn, ButtonSave } from "../../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import type { Service } from "../../types/global";
import { Modal } from "../../components/Modal";


const EditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [form, setForm] = useState<Service | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await (window as any).services.getById(Number(id));
            setForm(data);
        })();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => {
            // A guarda de proteção unificada! Fica aqui no topo.
            // Se o estado anterior for nulo, a gente para a execução aqui mesmo.
            if (!prev) {
                return prev; // Retorna null e não faz mais nada.
            }

            // Se o código chegou até aqui, temos 100% de certeza que 'prev' NÃO é null.
            // Agora podemos fazer nossa lógica com segurança.
            if (name === "value") {
                const numeric = value.replace(/\D/g, "");
                return {
                    ...prev, // Operação segura!
                    value: numeric ? parseInt(numeric, 10) : 0,
                };
            } else {
                return {
                    ...prev, // Operação segura!
                    [name]: value
                };
            }
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form) return;
        const result = await (window as any).services.update(form);
        if (result && result.success) {
            // opcional: mostrar aviso
            setModalOpen(true)
        } else {
            console.error("Erro no update:", result);
        }
    }

    if (!form) return <p>Carregando...</p>;

    return (
        <>
            <ButtonReturn />
            <Title title="Editar Serviço/Produto" />
            <div className="p-8">

                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
                        <Input
                            onChange={handleChange}
                            value={
                                form.service
                            }
                            gridClass="md:col-span-5"
                            label="Serviço/Produto"
                            id="service"
                            name="service"
                            type="text"
                            placeholder="Ex: Formatação de Notebook"
                        />

                        <Input
                            onChange={handleChange}
                            value={form.value ? (form.value / 100).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                                : ""}
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
                <Modal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        navigate("/service-list");
                    }}
                    title="Serviço atualizado"
                    message="Será redirecionado para página anterior."
                />
            </div>
        </>
    )
}

export default EditService;
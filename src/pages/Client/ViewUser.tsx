import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { ButtonReturn } from "../../components/Button";
import { useParams, useNavigate } from "react-router-dom";
import ViewData from "../../components/ViewData";
import type { Client } from "../../types/global";




const ViewUser = () => {
    const { id } = useParams();

    const [form, setForm] = useState<Client | null>(null);

    useEffect(() => {
        (async () => {
            const data = await (window as any).clients.getById(Number(id));
            setForm(data);
        })();
    }, [id]);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    // }

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     if (!form) return;
    //     const result = await (window as any).clients.update(form);
    //     if (result && result.success) {
    //         // opcional: mostrar aviso
    //         alert("Cliente atualizado com sucesso!");
    //         navigate("/client-list"); // ajustar para a rota correta do App.tsx
    //     } else {
    //         console.error("Erro no update:", result);
    //         alert("Falha ao atualizar cliente. Veja console para detalhes.");
    //     }
    // }

    if (!form) return <p>Carregando...</p>;

    return (
        <>
            <ButtonReturn />
            <Title title="Dados do Cliente" subtitle="Visualize as informaçoes." />
            <div className="p-8 ">
                <div className="flex gap-5 m-auto md:justify-center ">
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4 ">
                        <h2 className="text-center text-lg border-b border-black py-1">Indetificação</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">

                            <ViewData info="Nome:" data={form.name} />
                            <ViewData info="Razão Social:" data={form.company} />
                            <ViewData info="CNPJ/CPF:" data={form.cnpj_cpf} />
                        </div>
                    </div>
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4">
                        <h2 className="text-center text-lg border-b border-black py-1">Logradouro</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">

                            <ViewData info="Endereço:" data={form.adress} />
                            <ViewData info="N:" data={form.number} />
                            <ViewData info="Bairro:" data={form.neighborhood} />
                            <ViewData info="Cidade:" data={form.city} />
                            <ViewData info="UF:" data={form.uf} />
                            <ViewData info="CEP:" data={form.cep} />
                            <ViewData info="Complemento:" data={form.complement} />
                        </div>
                    </div>
                    <div className="border-border w-full bg-background-surface shadow-md rounded-lg p-4">
                        <h2 className="text-center text-lg border-b border-black py-1">Contato</h2>
                        <div className="py-2 px-5 grid grid-cols-1 gap-1">
                            <ViewData info="E-mail:" data={form.email} />
                            <ViewData info="Telefone:" data={form.phone} />
                            <ViewData info="Celular:" data={form.cell} />
                        </div>
                    </div>
                </div>
                {/* TESTE */}
                <div className="w-full">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Código da Nota</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Celular</th>
                                <th scope="col" className="px-6 py-3">Cidade</th>
                                <th scope="col" className="px-6 py-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewUser;
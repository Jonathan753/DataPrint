import Title from "../components/Title";
import { ButtonNext, ButtonReset } from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Client = {
    cnpj_cpf: string;
    name: string;
    company: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    complement: string;
    phone: string;
    cell: string
}

const NoteFast = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState<Client>({
            cnpj_cpf: "",
            name: "",
            company: "",
            email: "",
            adress: "",
            number: "",
            neighborhood: "",
            city: "",
            uf: "",
            cep: "",
            complement: "",
            phone: "",
            cell: "",
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate("/nota-fast/template",  { state: { dadosDoFormulario: form } });
    }
    return (
        <>
            <Title title="Nota Rápida" subtitle="Faça sua nota sem burocracia." />
            <div className="p-8">
                <form method="GET" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
                        <Input gridClass="md:col-span-2" onChange={handleChange} value={form.name} label="Nome" id="nome" name="name" type="text" placeholder="João da Silva" />
                        <Input gridClass="md:col-span-2" onChange={handleChange} value={form.company} label="Razão Social" id="company" name="company" type="text" placeholder="Silva Comércio LTDA" />
                        <Input gridClass="md:col-span-4" onChange={handleChange} value={form.email} label="Email" id="email" name="email" type="email" placeholder="contato@silvacomercio.com" />
                        <Input gridClass="md:col-span-4" onChange={handleChange} value={form.adress} label="Endereço" id="endereco" name="adress" type="text" placeholder="Rua das Flores, 123" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.number} label="Nº" id="numero" name="number" type="text" placeholder="122" />
                        <Input gridClass="md:col-span-3" onChange={handleChange} value={form.neighborhood} label="Bairro" id="bairro" name="neighborhood" type="text" placeholder="Centro" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.city} label="Cidade" id="cidade" name="city" type="text" placeholder="São Paulo" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.uf} mask="letters-uf" label="UF" id="uf" name="uf" type="text" placeholder="PE" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cep} mask="00000-000" label="CEP" id="cep" name="cep" type="text" placeholder="50870-23" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cnpj_cpf} mask="cpf-cnpj" label="CPF/CNPJ" id="cnpj_cpf" name="cnpj_cpf" type="text" placeholder="000.000.000-00 ou 00.000.000/0001-00" />
                        <Input gridClass="md:col-span-2" onChange={handleChange} value={form.complement} label="Complemento" id="complement" name="complement" type="text" placeholder="Apto 42" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.phone} mask="(00) 00000-0000" label="Telefone" id="telefone" name="phone" type="tel" placeholder="(11) 2345-6789" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cell} mask="(00) 00000-0000" label="Celular" id="celular" name="cell" type="tel" placeholder="(11) 98765-4321" />
                    </div>
                    <div className="mt-8 flex justify-end gap-4">
                        <ButtonReset />
                        <ButtonNext />
                    </div>
                </form>
            </div>
        </>
    )
}

export default NoteFast;
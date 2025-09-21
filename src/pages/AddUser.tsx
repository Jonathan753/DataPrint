import { useState } from "react";
import Input from "../components/Input";
import Title from "../components/Title";
import ButtonSave from "../components/ButtonSave";

type Clients = {
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

const AddUser = () => {

    const [form, setForm] = useState<Clients>({
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await (window as any).clients.add(form);
        // const data = await (window as any).clients.all();
        // setClients(data);
        setForm({ ...form, cnpj_cpf: "", name: "", company: "", email: "", adress: "", number: "", neighborhood: "", city: "", uf: "", cep: "", complement: "", phone: "", cell: "" });
        alert("client cadastrado com sucesso");
    }

    return (
        <>
            <Title title="Adicionar Cliente" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.name} label="Nome" id="nome" name="name" type="text" placeholder="João da Silva" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.company} label="Razão Social" id="company" name="company" type="text" placeholder="Silva Comércio LTDA" />
                    <Input gridClass="md:col-span-2" onChange={handleChange} value={form.email} label="Email" id="email" name="email" type="email" placeholder="contato@silvacomercio.com" />
                    <Input gridClass="md:col-span-2" onChange={handleChange} value={form.adress} label="Endereço" id="endereco" name="adress" type="text" placeholder="Rua das Flores, 123" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.number} label="Nº" id="numero" name="number" type="text" placeholder="122" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.neighborhood} label="Bairro" id="bairro" name="neighborhood" type="text" placeholder="Centro" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.city} label="Cidade" id="cidade" name="city" type="text" placeholder="São Paulo" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.uf} label="UF" id="uf" name="uf" type="text" placeholder="PE" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cep} label="CEP" id="cep" name="cep" type="text" placeholder="50870-23" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cnpj_cpf} label="CPF/CNPJ" id="cnpj_cpf" name="cnpj_cpf" type="text" placeholder="00.000.000/0001-00" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.complement} label="Complemento" id="complement" name="complement" type="text" placeholder="Apto 42" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.phone} label="Telefone" id="telefone" name="phone" type="tel" placeholder="(11) 2345-6789" />
                    <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cell} label="Celular" id="celular" name="cell" type="tel" placeholder="(11) 98765-4321" />
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Cancelar
                    </button>
                    <ButtonSave />
                </div>
            </form>
        </>
    )
}

export default AddUser;
import { useEffect, useState } from "react";
import { ButtonSave } from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import { Modal } from "../components/Modal";

const MyInfo = () => {
    const [form, setForm] = useState<any>({});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await (window as any).myInfo.get();
            if (data) setForm(data);
        })();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await (window as any).myInfo.save(form);
        setModalOpen(true);
    }

    return (
        <>
            <Title title="Meus Dados" subtitle="Insira os dados da sua empresa." />
            <div className="p-8">

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.name} label="Nome" id="nome" name="name" type="text" placeholder="João da Silva" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.email} label="Email" id="email" name="email" type="email" placeholder="contato@silvacomercio.com" />
                        <Input gridClass="md:col-span-2" onChange={handleChange} value={form.adress} label="Endereço" id="endereco" name="adress" type="text" placeholder="Rua das Flores, 123" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.number} label="Nº" id="numero" name="number" type="text" placeholder="122" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.salesperson} label="Vendedor" id="vendedor" name="salesperson" type="text" placeholder="Maria" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.city} label="Cidade" id="cidade" name="city" type="text" placeholder="São Paulo" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.uf} mask="letters-uf" label="UF" id="uf" name="uf" type="text" placeholder="PE" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cep} mask="00000-000" label="CEP" id="cep" name="cep" type="text" placeholder="50899-250" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cnpj} mask="cpf-cnpj" label="CPF/CNPJ" id="cnpj" name="cnpj" type="text" placeholder="00.000.000/0001-00" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.phone} mask="(00) 00000-0000" label="Telefone" id="telefone" name="phone" type="text" placeholder="(11) 2345-6789" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.cell} mask="(00) 00000-0000" label="Celular" id="celular" name="cell" type="text" placeholder="(11) 98765-4321" />
                        <Input gridClass="md:col-span-1" onChange={handleChange} value={form.pix} label="Chave PIX" id="pix" name="pix" type="text" placeholder="key pix" />
                        <Input gridClass="md:col-span-1" label="Logo" id="celular" name="cell" type="file" />
                    </div>
                    <div className="mt-8 flex justify-end gap-4">
                        <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            Cancelar
                        </button>
                        <ButtonSave />
                    </div>
                </form>
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Salvo com Sucesso"
                    message="Seus dados foram armazenados!"
                />
            </div>
        </>
    )
}

export default MyInfo;
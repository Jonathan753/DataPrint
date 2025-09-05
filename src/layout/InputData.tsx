import Button from "../components/Button";
import Input from "../components/Input"; // Importando nosso novo componente
import Title from "../components/Title";

interface Props {
    title: string,

}

const InputData = ({title}:Props) => {
    return (
        <>
            {/* Formulário */}
            <Title title={title} />
            <form method="GET">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Usamos as classes de grid para posicionar os campos */}
                    <Input gridClass="md:col-span-1" label="Nome" id="nome" name="nome" type="text" placeholder="João da Silva" />
                    <Input gridClass="md:col-span-1" label="Razão Social" id="razao" name="razao" type="text" placeholder="Silva Comércio LTDA" />
                    <Input gridClass="md:col-span-2" label="Email" id="email" name="email" type="email" placeholder="contato@silvacomercio.com" />
                    <Input gridClass="md:col-span-2" label="Endereço" id="endereco" name="endereco" type="text" placeholder="Rua das Flores, 123" />
                    <Input gridClass="md:col-span-1" label="N" id="numero" name="numero" type="text" placeholder="122" />
                    <Input gridClass="md:col-span-1" label="Bairro" id="bairro" name="bairro" type="text" placeholder="Centro" />
                    <Input gridClass="md:col-span-1" label="Cidade" id="cidade" name="cidade" type="text" placeholder="São Paulo" />
                    <Input gridClass="md:col-span-1" label="UF" id="uf" name="uf" type="text" placeholder="PE" />
                    <Input gridClass="md:col-span-1" label="CPF/CNPJ" id="cpf_cnpj" name="cpf_cnpj" type="text" placeholder="00.000.000/0001-00" />
                    <Input gridClass="md:col-span-1" label="Complemento" id="complemento" name="complemento" type="text" placeholder="Apto 42" />
                    <Input gridClass="md:col-span-1" label="Telefone" id="telefone" name="telefone" type="tel" placeholder="(11) 2345-6789" />
                    <Input gridClass="md:col-span-1" label="Celular" id="celular" name="celular" type="tel" placeholder="(11) 98765-4321" />
                </div>

                {/* Botões do Formulário */}
                <div className="mt-8 flex justify-end gap-4">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        Cancelar
                    </button>
                    <Button/>
                </div>
            </form>

        </>
    )
}

export default InputData;
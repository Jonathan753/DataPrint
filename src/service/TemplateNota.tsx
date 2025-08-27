import logo from "../assets/add_user.svg"
const TemplateNota = () => {
    return (
        <>
            <div className="bg-white">

                <div className="flex">
                    <img className="w-48" src={logo} alt="" />
                    <div>
                        <p>Endereço: { }</p>
                        <div className="flex">
                            <p>Cidade:</p>
                            <p>UF:</p>
                            <p>CEP:</p>
                        </div>
                        <div>
                            <p>Telefone:</p>
                            <p>Cel:</p>
                        </div>
                        <p>Email:</p>
                        <p>CNPJ:</p>
                    </div>
                </div>
                <hr className="border-black" />
                <div className="flex">
                    <p>Cidade:</p>
                    <p>UF:</p>
                    <p>CEP:</p>
                </div>
                <hr className="border-black" />
                <div className="flex">
                    <p>Nome:</p>
                    <p>Telefone:</p>
                    <p>Cel:</p>
                </div>
                <div className="flex">
                    <p>Razão:</p>
                    <p>CNPJ/CPF:</p>
                </div>
                <div className="flex">
                    <p>Email:</p>
                    <p>Contato:</p>
                </div>
                <div className="flex">
                    <p>End:</p>
                    <p>N:</p>
                    <p>Bairro</p>
                    <p>Compl.</p>
                </div>
                <div className="flex">
                    <p>Cidade:</p>
                    <p>UF:</p>
                    <p>CEP:</p>
                </div>
                <p>Obs.:</p>
                <table>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Un</th>
                        <th>Qtd</th>
                        <th>Preço</th>
                        <th>Total</th>
                    </tr>
                </table>
                <hr className="border-black" />
                <h1 className="text-4xl">Analisar aqui</h1>
            </div>
        </>
    )
}

export default TemplateNota;
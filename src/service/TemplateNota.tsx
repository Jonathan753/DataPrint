import { useEffect, useState } from "react";
import logo from "../assets/logo.png"



const TemplateNota = () => {

    const [empresa, setEmpresa] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const data = await (window as any).myInfo.get();
            setEmpresa(data);
        })();
    }, []);

    if (!empresa) return <p>Necessita dos dados da empresa</p>;


    return (
        <>
            <div className="bg-white w-auto">

                <div className="flex">
                    <img className="w-48" src={logo} alt="" />
                    <div>
                        <p>Endereço: {empresa.adress}</p>
                        <div className="flex">
                            <p>Cidade:{empresa.city}</p>
                            <p>UF:{empresa.uf}</p>
                            <p>CEP: {empresa.neighborhood}</p>
                        </div>
                        <div>
                            <p>Telefone:{empresa.phone}</p>
                            <p>Cel:{empresa.cell}</p>
                        </div>
                        <p>Email:{empresa.email}</p>
                        <p>CNPJ:{empresa.cnpj}</p>
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
                    <thead>

                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Un</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Código</td>
                            <td>Descrição</td>
                            <td>Un</td>
                            <td>Qtd</td>
                            <td>Preço</td>
                            <td>Total</td>
                        </tr>
                    </tbody>

                </table>
                <hr className="border-black" />
                <h1 className="text-4xl">Analisar aqui</h1>
            </div>
        </>
    )
}

export default TemplateNota;
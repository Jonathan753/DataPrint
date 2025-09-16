import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png"

type Client = {
    id: number;
    cnpj_cpf: string;
    name: string;
    razao: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    complemento: string;
    phone: string;
    cell: string
};

type Service = {
    id:  number,
    servico: string;
    value: string;
}

type Nota = {
    cliente: Client;
    servicos: Service[];
};

const Modelo = () => {


    //UseSate para cada cado
    const { id } = useParams();
    const [cliente, setCliente] = useState<Client | null>(null);
    const [produtos, setProdutos] = useState<Service[]>([]);
    const [nota, setNota] = useState<Nota | null>(null);
    const [empresa, setEmpresa] = useState<any>(null);

    // useEffect(() => {
    //     (async () => {


    //     })();
    // }, []);

    ////////////////////
    // useEffect(() => {
    //     async function fetchData() {
    //         // busca cliente no BD
    //         const c = await (window as any).cliente.getById(Number(id));
    //         // busca produtos no BD
    //         // const p = await (window as any).produtos.getAll();
    //         console.log('cliente do banco')
    //         setCliente(c);
    //         // setProdutos(p);
    //         // setNota({ cliente: c, produtos: [] });
    //     }
    //     fetchData();
    // }, [id]);
    useEffect(() => {
        (async () => {
            const c = await (window as any).clients.getById(id);
            const e = await (window as any).myInfo.get();
            const p = await (window as any).services.all();
            setProdutos(p);
            setCliente(c);
            setEmpresa(e);
        })();
    }, [id]);
    if (!empresa) return <p>Necessita dos dados da empresa</p>;
    /////////////
    function addProduto(servico: Service) {
        setNota((prev) =>
            prev ? { ...prev, servicos: [...prev.servicos, servico] } : prev
        );
    }



    return (
        <>
            <div className="bg-white w-auto">

                <div>
                    <h3>Produtos disponíveis</h3>
                    <ul>
                        {produtos.map((p) => (
                            <li key={p.id}>
                                {p.servico} - R$ {p.value}{" "}
                                <button onClick={() => addProduto(p)}>Adicionar</button>
                            </li>
                        ))}
                    </ul>
                </div>

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
                    <p>Cidade:{cliente?.city}</p>
                    <p>UF:{cliente?.uf}</p>
                    <p>CEP:{cliente?.neighborhood}</p>
                </div>
                <hr className="border-black" />
                <div className="flex">
                    <p>Nome:{cliente?.name}</p>
                    <p>Telefone:{cliente?.phone}</p>
                    <p>Cel:{cliente?.cell}</p>
                </div>
                <div className="flex">
                    <p>Razão:{cliente?.razao}</p>
                    <p>CNPJ/CPF:{cliente?.cnpj_cpf}</p>
                </div>
                <div className="flex">
                    <p>Email:{cliente?.email}</p>
                    <p>Contato:{cliente?.phone}</p>
                </div>
                <div className="flex">
                    <p>End:{cliente?.adress}</p>
                    <p>N:{cliente?.number}</p>
                    <p>Bairro:{cliente?.neighborhood}</p>
                    <p>Compl.:{cliente?.complemento}</p>
                </div>
                <div className="flex">
                    <p>Cidade:{cliente?.city}</p>
                    <p>UF:{cliente?.uf}</p>
                    <p>CEP:{cliente?.uf}</p>
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
                         {nota?.servicos.map((p, idx) => (
                        <tr key={idx}>
                            <td >{p.id}</td>
                            <td>{p.servico}</td>
                            <td> 2 </td>
                            <td>{p.value}</td>
                            <td>Total</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
                <hr className="border-black" />
                <br />
                <br />
                <h1 className="text-4xl">Analisar aqui</h1>
            </div>
        </>
    )
}

export default Modelo;
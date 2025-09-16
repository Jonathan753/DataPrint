import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png"
import SearchService from "../components/SearchService";
import Input from "../components/Input";

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

type SelectService = {
    id: number,
    qtd: number,
    servico: string;
    value: string;
}
type Service = {
    id: number,
    qtd: number,
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
    const [obs, setObs] = useState('');
    // const [produtos, setProdutos] = useState<Service[]>([]);
    const [produtos, setProdutos] = useState<SelectService[]>([]);
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
            // const p = await (window as any).services.all();
            // setProdutos(p);
            setCliente(c);
            setEmpresa(e);
        })();
    }, [id]);
    if (!empresa) return <p>Necessita dos dados da empresa</p>;
    /////////////
    function addProduto(servico: Service) {

        setProdutos((prev) => [...prev, servico]);
    }

    const handleChange = (e:any) => {
        setObs(e.target.value)
    }



    return (
        <>
            <div className="bg-white w-auto">

                <div>
                    <SearchService onAdd={addProduto} />


                    <h3>Produtos na Nota</h3>
                    <ul>
                        {produtos.map((p, idx) => (
                            <li key={idx}>
                                {p.servico} - R$ {p.value}
                            </li>
                        ))}
                    </ul>

                    <Input gridClass="md:col-span-1" onChange={handleChange} value={obs} label="OBS" id="obs" name="obs" type="text" placeholder="Uma Observação" />

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
                    <p>Vendedor:{cliente?.city}</p>
                    <p>Pedido:{cliente?.uf}</p>
                    <p>Emissão:{cliente?.neighborhood}</p>
                    <p>Hora:{cliente?.neighborhood}</p>
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
                <p>Obs.:{obs}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((p, idx) => (
                            <tr key={idx}>
                                <td >{p.id}</td>
                                <td>{p.servico}</td>
                                <td> {p.qtd} </td>
                                <td>{p.value}</td>
                                <td>{parseFloat(p.value) * p.qtd}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <hr className="border-black" />
                <br />
                <br />
                <h1 className="text-4xl">Total</h1>
            </div>
        </>
    )
}

export default Modelo;
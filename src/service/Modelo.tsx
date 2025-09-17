import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png"
import SearchService from "../components/SearchService";
import Input from "../components/Input";

type Clients = {
    id: number;
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
};

// type SelectService = {
//     id: number,
//     qtd: number,
//     service: string;
//     value: string;
// }
type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: string;
}

type Nota = {
    cliente: Clients;
    servicos: Service[];
};

const Modelo = () => {

    let today = new Date().toLocaleDateString('pt-BR');
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2,'0');

    //UseSate para cada cado
    const { id } = useParams();
    const [cliente, setCliente] = useState<Clients | null>(null);
    const [obs, setObs] = useState('');
    // const [produtos, setProdutos] = useState<Service[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    // const [nota, setNota] = useState<Nota | null>(null);
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
    function addService(service: Service) {

        setServices((prev) => [...prev, service]);
    }

    const handleChange = (e:any) => {
        setObs(e.target.value)
    }



    return (
        <>
            <div className="bg-white w-auto">

                <div>
                    <SearchService onAdd={addService} />


                    <h3>Produtos na Nota</h3>
                    <ul>
                        {services.map((s, idx) => (
                            <li key={idx}>
                                {s.service} - R$ {s.value}
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
                            <p>Cidade: {empresa.city}</p>
                            <p>UF: {empresa.uf}</p>
                            <p>CEP: {empresa.neighborhood}</p>
                        </div>
                        <div>
                            <p>Telefone: {empresa.phone}</p>
                            <p>Cel: {empresa.cell}</p>
                        </div>
                        <p>Email: {empresa.email}</p>
                        <p>CNPJ: {empresa.cnpj}</p>
                    </div>
                </div>
                <hr className="border-black" />
                <div className="flex">
                    <p>Vendedor: {empresa.salesperson}</p>
                    <p>Pedido: {cliente?.uf}</p>
                    <p>Emissão: {today}</p>
                    <p>Hora: {hours}:{minute}</p>
                </div>
                <hr className="border-black" />
                <div className="flex">
                    <p>Nome: {cliente?.name}</p>
                    <p>Telefone: {cliente?.phone}</p>
                    <p>Cel: {cliente?.cell}</p>
                </div>
                <div className="flex">
                    <p>Razão: {cliente?.company}</p>
                    <p>CNPJ/CPF: {cliente?.cnpj_cpf}</p>
                </div>
                <div className="flex">
                    <p>Email: {cliente?.email}</p>
                    <p>Contato: {cliente?.phone}</p>
                </div>
                <div className="flex">
                    <p>End: {cliente?.adress}</p>
                    <p>N: {cliente?.number}</p>
                    <p>Bairro: {cliente?.neighborhood}</p>
                    <p>Compl.: {cliente?.complement}</p>
                </div>
                <div className="flex">
                    <p>Cidade: {cliente?.city}</p>
                    <p>UF: {cliente?.uf}</p>
                    <p>CEP: {cliente?.cep}</p>
                </div>
                <p>Obs.: {obs}</p>
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
                        {services.map((s, idx) => (
                            <tr key={idx}>
                                <td >{s.serviceId}</td>
                                <td>{s.service}</td>
                                <td> {s.qtd} </td>
                                <td>{s.value}</td>
                                <td>{(parseFloat(s.value) * s.qtd)/100}</td>
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
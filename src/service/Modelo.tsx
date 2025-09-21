import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo_newDataPrint.svg"
import SearchService from "../components/SearchService";
import Input from "../components/Input";
import { gerarQrCodePix } from "./pix";
import ButtonPrinter from "../components/ButtonPrinter";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Clients = {
    clientId: number;
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

type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: number;
}

// type Nota = {
//     cliente: Clients;
//     servicos: Service[];
// };

const Modelo = () => {

    const notaRef = useRef<HTMLDivElement | null>(null)
    //UseSate para cada dado
    const { id } = useParams();
    const [cliente, setCliente] = useState<Clients | null>(null);
    const [obs, setObs] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<any>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [acressimo, setAcressimo] = useState(0);
    const [desconto, setDesconto] = useState(0);

    const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);

    let result = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acressimo / 10000))
    let today = new Date().toLocaleDateString('pt-BR');
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2, '0');

    useEffect(() => {
        async function makeQr() {
            if (result > 0) {
                const dataUrl = await gerarQrCodePix(result);
                setQrCode(dataUrl);
            }
        }
        makeQr();
    }, [result]);

    useEffect(() => {
        (async () => {
            const c = await (window as any).clients.getById(id);
            const e = await (window as any).myInfo.get();
            setCliente(c);
            setEmpresa(e);
        })();
    }, [id]);
    if (!empresa) return <p>Necessita dos dados da empresa</p>;

    /////////////////

    async function handleDownloadPDF() {
        if (!notaRef.current) return;

        const canvas = await html2canvas(notaRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
        pdf.save("nota.pdf");
    }

    async function handlePrintPDF() {
        if (!notaRef.current) return;

        const canvas = await html2canvas(notaRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 1, 1, pageWidth, imgHeight);

        // gera blob e manda para o Electron imprimir
        const pdfBlob = pdf.output("blob");
        const arrayBuffer = await pdfBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await (window as any).electronAPI.printBuffer(buffer);
    }

    // const handleGerarPDF = () => {
    //     const div = document.getElementById("nota-pdf");
    //     if (div) {
    //         (window as any).pdf.gerar(div.outerHTML);
    //     }
    // };

    // const handleImprimir = () => {
    //     const div = document.getElementById("nota-pdf");
    //     if (div) {
    //         (window as any).pdf.imprimir(div.outerHTML);
    //     }
    // };

    /////////////
    function addService(service: Service) {
        setServices((prev) => [...prev, service]);
    }
    const handleChangeObs = (e: any) => {
        setObs(e.target.value)
    }
    const handleChangeAcressimo = (e: any) => {
        setAcressimo(e.target.value);
    }
    const handleChangeDesconto = (e: any) => {
        setDesconto(e.target.value);
    }





    return (
        <>
            <div className="bg-white" style={{ minWidth: "800px" }}>

                <div className="p-4">
                    <label htmlFor="">Adição de Serviços</label>
                    <SearchService onAdd={addService} />
                    <h3>Produtos na Nota</h3>
                    <ul className="mb-4">
                        {services.map((s, idx) => (
                            <li key={idx}>
                                {s.service} - {
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(s.value / 100)
                                }
                            </li>
                        ))}
                    </ul>

                    <div className="grid grid-cols-4 gap-2">
                        <Input gridClass="md:col-span-4" onChange={handleChangeObs} value={obs} label="OBS" id="obs" name="obs" type="text" placeholder="Uma Observação" />
                        <Input gridClass="md:col-span-1" onChange={handleChangeAcressimo} value={acressimo} label="Acréssimo" id="acressimo" name="acressimo" type="text" placeholder="20%" />
                        <Input gridClass="md:col-span-1" onChange={handleChangeDesconto} value={desconto} label="Desconto" id="desconto" name="desconto" type="text" placeholder="10%" />
                    </div>
                </div>

                <div ref={notaRef} id="nota" className="template border-black border-2 p-2 mt-4 ">
                    <div className="grid grid-cols-2">
                        <img className="" src={logo} alt="" />
                        <div className="grid grid-rows-5">
                            <p>Endereço: {empresa.adress}</p>
                            <div className="grid grid-cols-3 gap-1">
                                <p>Cidade: {empresa.city}</p>
                                <p>UF: {empresa.uf}</p>
                                <p>CEP: {empresa.neighborhood}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Telefone: {empresa.phone}</p>
                                <p>Cel: {empresa.cell}</p>
                            </div>
                            <p>Email: {empresa.email}</p>
                            <p>CNPJ: {empresa.cnpj}</p>
                        </div>
                    </div>
                    <hr className="border-black" />
                    <div className="grid grid-cols-4 py-1">
                        <p>Vendedor: {empresa.salesperson}</p>
                        <p>Pedido: {cliente?.uf}</p>
                        <p>Emissão: {today}</p>
                        <p>Hora: {hours}:{minute}</p>
                    </div>
                    <hr className="border-black" />
                    <div className="grid grid-cols-3">
                        <p>Nome: {cliente?.name}</p>
                        <p>Telefone: {cliente?.phone}</p>
                        <p>Cel: {cliente?.cell}</p>
                    </div>
                    <div className="grid grid-cols-3">
                        <p>Razão: {cliente?.company}</p>
                        <p>CNPJ/CPF: {cliente?.cnpj_cpf}</p>
                    </div>
                    <div className="grid grid-cols-3">
                        <p>Email: {cliente?.email}</p>
                        <p>Contato: {cliente?.phone}</p>
                    </div>
                    <div className="grid grid-cols-4">
                        <p>End: {cliente?.adress}</p>
                        <p>Nº: {cliente?.number}</p>
                        <p>Bairro: {cliente?.neighborhood}</p>
                        <p>Compl.: {cliente?.complement}</p>
                    </div>
                    <div className="grid grid-cols-3">
                        <p>Cidade: {cliente?.city}</p>
                        <p>UF: {cliente?.uf}</p>
                        <p>CEP: {cliente?.cep}</p>
                    </div>
                    <p>Obs.: {obs}</p>
                    <hr className="border-black" />
                    <table className="w-full">
                        <thead>
                            <tr className="text-left">
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
                                    <td>{
                                        new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(s.value / 100)
                                    }</td>
                                    <td>{

                                        new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format((s.value / 100) * s.qtd)
                                    }</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <hr className="border-black" />
                    <br />
                    <br />
                    <div className="grid grid-cols-2">
                        <div className="content-center">
                            <h2>Total Bruto:
                                {
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(totalBruto / 100)
                                }
                            </h2>
                            <h2>Desconto: {
                                new Intl.NumberFormat("pt-BR").format(desconto / 100)
                            } %</h2>
                            <h2>Acrésssimo: {
                                new Intl.NumberFormat("pt-BR").format(acressimo / 100)
                            } %</h2>
                            <h1 className="text-3xl">Total Liq: {
                                new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format((totalBruto / 100) - (((totalBruto / 100) * desconto / 100) / 100) + (((totalBruto / 100) * acressimo / 100) / 100))
                            }</h1>
                        </div>
                        <div>
                            <div className="border-black border-solid border-2 w-36 m-auto">
                                {qrCode && (
                                    <img src={qrCode} alt="QR Code Pix" className="w-32 h-32 m-auto" />
                                )}
                            </div>
                            <h3 className="text-center">QR Code PIX</h3>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 p-4">
                        <ButtonPrinter onClick={handleDownloadPDF} />
                    <div className="col-start-6">
                        <ButtonPrinter onClick={handlePrintPDF} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modelo;
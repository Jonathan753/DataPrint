import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo_newDataPrint.svg"
import SearchService from "../../components/SearchService";
import Input from "../../components/Input";
import { gerarQrCodePix } from "../../service/pix";
import { ButtonPrinter, ButtonReturn } from "../../components/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Title from "../../components/Title";
import type { Client, Enterprise } from "../../types/global";
import ReceiptTemplate from "../../layout/ReceiptTemplate";


type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: number;
}

const Template = () => {

    const notaRef = useRef<HTMLDivElement | null>(null)
    //UseSate para cada dado
    const { id } = useParams();
    const [cliente, setCliente] = useState<Client | null>(null);
    const [obs, setObs] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<Enterprise | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [acrescimo, setAcrescimo] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [order, setOrder] = useState(0);

    const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);

    let totalLiquido = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acrescimo / 10000));

    let today = new Date().toLocaleDateString('pt-BR');
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2, '0');

    useEffect(() => {
        (async () => {
            const c = await (window as any).clients.getById(id);
            const e = await (window as any).myInfo.get();
            const o = await (window as any).receipt.getMaxNumber();
            setCliente(c);
            setEmpresa(e);
            setOrder(o);
        })();
    }, [id]);

    useEffect(() => {
        async function makeQr() {
            if (totalLiquido > 0 && empresa && empresa.pix) {
                const dataUrl = await gerarQrCodePix(totalLiquido, empresa.pix, empresa.name, empresa.city);
                setQrCode(dataUrl);
            }
        }
        makeQr();
    }, [totalLiquido, empresa]);

    if (!empresa) return <p>Necessita dos dados da empresa</p>;

    /////////////////

    async function handleDownloadPDF() {
        if (!notaRef.current) return;

        const canvas = await html2canvas(notaRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        // const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
        pdf.save("nota.pdf");

        await (window as any).receipt.add(receipt);
    }

    // Imprimir direto
    // async function handlePrint() {
    //     if (!notaRef.current) return;

    //     const canvas = await html2canvas(notaRef.current, { scale: 2 });
    //     const imgData = canvas.toDataURL("image/png");

    //     // Abre em nova aba para o navegador imprimir
    //     const win = window.open("");
    //     if (win) {
    //         win.document.write(`<img src="${imgData}" style="width:100%">`);
    //         win.document.close();
    //         win.print();
    //     }
    // }
    /////////////
    function addService(service: Service) {
        setServices((prev) => [...prev, service]);
    }
    const handleChangeObs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setObs(e.target.value)
    }
    const handleChangeAcressimo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numeric = e.target.value.replace(/\D/g, ""); // só números
        setAcrescimo(numeric ? parseInt(numeric, 10) : 0);
    };

    const handleChangeDesconto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numeric = e.target.value.replace(/\D/g, "");
        setDesconto(numeric ? parseInt(numeric, 10) : 0);
    };

    const receipt = {
        clientId: cliente?.clientId,
        dataEmissao: new Date().toISOString(),
        totalBruto,
        desconto,
        acrescimo,
        obs,
        totalLiquido: totalLiquido / 100,
        services: services.map(s => ({
            serviceId: s.serviceId,
            qtd: s.qtd,
            valueUnitario: s.value,
            valueTotal: s.qtd * s.value
        }))
    };



    let subtitle = cliente?.name ?? ""


    return (
        <>
            <ButtonReturn />

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>
                <div className="p-4">
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="">Adição de Serviços</label>
                    <SearchService onAdd={addService} />

                    <div className="p-4">
                        <h3 className="font-medium">Produtos na Nota:</h3>
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
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        <Input gridClass="md:col-span-4" onChange={handleChangeObs} value={obs} label="OBS" id="obs" name="obs" type="text" placeholder="Uma Observação" />
                        <Input gridClass="md:col-span-1" onChange={handleChangeAcressimo} value={
                            acrescimo
                                ? (acrescimo / 100).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })
                                : ""
                        } label="Acréssimo" id="acressimo" name="acressimo" type="text" placeholder="20%" />
                        <Input gridClass="md:col-span-1" onChange={handleChangeDesconto} value={
                            desconto
                                ? (desconto / 100).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })
                                : ""
                        } label="Desconto" id="desconto" name="desconto" type="text" placeholder="10%" />
                    </div>
                </div>

                {/* <div className="template border bg-zinc-700 border-black border-1 p-2 mt-4">
                    <div ref={notaRef} id="nota" style={{ width: '210mm', minHeight: '297mm' }} className="bg-white mx-auto p-8 shadow-lg">
                        <div className="grid grid-cols-3 gap-2">
                            <img className="my-auto" src={logo} alt="" />
                            <div className="grid grid-rows-5 col-span-2 p-2 px-4">
                                <p>Endereço: {empresa.adress}</p>
                                <div className="grid grid-cols-3">
                                    <p>Cidade: {empresa.city}</p>
                                    <p>UF: {empresa.uf}</p>
                                    <p>CEP: {empresa.cep}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p>Telefone: {empresa.phone}</p>
                                    <p>Cel: {empresa.cell}</p>
                                </div>
                                <p>Email: {empresa.email}</p>
                                <p>CNPJ: {empresa.cnpj}</p>
                            </div>
                        </div>
                        <hr className="border-black border-collapse mt-2" />
                        <div className="grid grid-cols-4">
                            <p>Vendedor: {empresa.salesperson}</p>
                            <p>Pedido: {(order + 1).toString().padStart(4, "0")}</p>
                            <p>Emissão: {today}</p>
                            <p>Hora: {hours}:{minute}</p>
                        </div>
                        <hr className="border-black border-collapse mt-2" />
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
                        <div className="w-full">
                            <p className="break-words">Obs.: {obs}</p>
                        </div>
                        <hr className="border-black border-collapse mt-2" />
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
                        <hr className="border-black border-collapse mt-2" />
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
                                    new Intl.NumberFormat("pt-BR").format(acrescimo / 100)
                                } %</h2>
                                <h1 className="text-3xl">Total Liq: {
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(totalLiquido / 100)
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
                </div> */}

                <ReceiptTemplate
                    ref={notaRef} // Passando a ref para o componente filho
                    logo={logo}
                    empresa_adress={empresa.adress}
                    empresa_city={empresa.city}
                    empresa_uf={empresa.uf}
                    empresa_cep={empresa.cep}
                    empresa_phone={empresa.phone}
                    empresa_cell={empresa.cell}
                    empresa_email={empresa.email}
                    empresa_cnpj={empresa.cnpj}
                    empresa_salesperson={empresa.salesperson}
                    order={(order + 1).toString()}
                    hours={hours}
                    today={today}
                    minute={minute}
                    obs={obs}
                    cnpj_cpf={cliente?.cnpj_cpf}
                    name={cliente?.name}
                    company={cliente?.company}
                    email={cliente?.email}
                    adress={cliente?.adress}
                    number={cliente?.number}
                    neighborhood={cliente?.neighborhood}
                    city={cliente?.city}
                    uf={cliente?.uf}
                    cep={cliente?.cep}
                    complement={cliente?.complement}
                    phone={cliente?.phone}
                    cell={cliente?.cell}
                    totalBruto={totalBruto}
                    desconto={desconto}
                    acrescimo={acrescimo}
                    totalLiquido={totalLiquido}
                    qrCode={qrCode}
                    services={services} // Passando o array de serviços
                />

                <div className="flex p-4 justify-end">
                    <ButtonPrinter onClick={handleDownloadPDF} />
                    {/* <div className="col-start-6">
                        <ButtonPrinter onClick={handlePrint} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Template;
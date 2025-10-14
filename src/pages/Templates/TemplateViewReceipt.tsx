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
import type { Client, Enterprise, Receipt } from "../../types/global";
import ReceiptTemplate from "../../layout/ReceiptTemplate";


type Service = {
    id: number;
    receiptId: number;
    serviceId: number;
    qtd: number;
    valueUnitario: number;
    valueTotal: number;
    service: string;
}

const TemplateViewReceipt = () => {

    const notaRef = useRef<HTMLDivElement | null>(null)
    //UseSate para cada dado
    const { id, receipt } = useParams();

    const [cliente, setCliente] = useState<Client | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<Enterprise | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [receiptView, setReceiptView] = useState<Receipt | null>(null);

    // const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);



    useEffect(() => {
        (async () => {
            const c = await (window as any).clients.getById(Number(id));
            const s = await (window as any).receipt_services.getByIdService(Number(receipt));
            const e = await (window as any).myInfo.get();
            const r = await (window as any).receipt.getReceipt(Number(receipt));
            setCliente(c);
            setEmpresa(e);
            setReceiptView(r);
            setServices(s)
        })();
    }, [id, receipt]);

    let totalLiquido = (receiptView?.totalLiquido); //PROBLEMA AQUI
    console.log(totalLiquido)

    const handleDate = (data: string) => {
        if (receiptView?.date != null) {
            const d = new Date(data);
            return d.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
        }
    }
    const handleHoursMinute = (data: string) => {
        if (receiptView?.date != null) {
            const d = new Date(data);
            return d.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
            })
        }
    }

    //qr code com erro
    useEffect(() => {
        async function makeQr() {
            if (totalLiquido != null) {
                if (totalLiquido > 0 && empresa && empresa.pix) {
                    const dataUrl = await gerarQrCodePix(totalLiquido, empresa.pix, empresa.name, empresa.city);
                    setQrCode(dataUrl);
                }
            }
        }
        makeQr();
    }, [totalLiquido, empresa]);

    if (!empresa) return <p>Necessita dos dados da empresa</p>;
    if (!receiptView) return <p>Necessita dos dados da empresa</p>;

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
    // function addService(service: Service) {
    //     setServices((prev) => [...prev, service]);
    // }




    let subtitle = cliente?.name ?? ""


    return (
        <>
            <ButtonReturn />

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>


                <div className="template border bg-zinc-700 border-black border-1 p-2 mt-4">
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
                            <p>Pedido: {(receiptView.receiptId).toString().padStart(4, "0")}</p>
                            <p>Emissão: {handleDate(receiptView.date)}</p>
                            <p>Hora: {handleHoursMinute(receiptView.date)}</p>
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
                            <p className="break-words">Obs.:{receiptView.obs}</p>
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
                                        <td>{s.serviceId}</td>
                                        <td> {s.qtd} </td>
                                        <td>{
                                            new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(s.valueUnitario / 100)
                                        }</td>
                                        <td>{

                                            new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(s.valueTotal / 100)
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
                                        }).format(receiptView.totalBruto / 100)
                                    }
                                </h2>
                                <h2>Desconto: {
                                    // new Intl.NumberFormat("pt-BR").format(desconto / 100)
                                    receiptView.desconto / 100
                                } %</h2>
                                <h2>Acrésssimo: {
                                    // new Intl.NumberFormat("pt-BR").format(acrescimo / 100)
                                    receiptView.acrescimo / 100
                                } %</h2>
                                <h1 className="text-3xl">Total Liq: {
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(receiptView.totalLiquido)
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
                </div>
                {/* <ReceiptTemplate
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
                    order={receiptView.receiptId.toString().padStart(4, "0")}
                    hours={hours}
                    today={today}
                    minute={minute}
                    obs={receiptView.obs}
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
                    totalBruto={receiptView.totalBruto}
                    desconto={receiptView.desconto}
                    acrescimo={receiptView.acrescimo}
                    totalLiquido={receiptView.totalLiquido}
                    qrCode={qrCode}
                    services={services} // Passando o array de serviços
                /> */}

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

export default TemplateViewReceipt;
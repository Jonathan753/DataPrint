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
        pdf.save(`recibo_${(order + 1).toString().padStart(4,"0")}.pdf`);

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
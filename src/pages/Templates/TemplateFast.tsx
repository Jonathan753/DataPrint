import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo_newDataPrint.svg"
import SearchService from "../../components/SearchService";
import Input from "../../components/Input";
import { gerarQrCodePix } from "../../service/pix";
import { ButtonPrinter } from "../../components/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Title from "../../components/Title";
import ReceiptTemplate from "../../layout/ReceiptTemplate";

type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: number;
}

const TemplateFast = () => {

    const notaRef = useRef<HTMLDivElement | null>(null)
    //UseSate para cada dado
    const [obs, setObs] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<any>();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [acrescimo, setAcrescimo] = useState(0);
    const [desconto, setDesconto] = useState(0);

    const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);

    const location = useLocation();
    const dadosRecebidos = location.state?.dadosDoFormulario || null

    let result = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acrescimo / 10000));
    let totalLiquido = (totalBruto / 100) - (((totalBruto / 100) * desconto / 100) / 100) + (((totalBruto / 100) * acrescimo / 100) / 100)
    let today = new Date().toLocaleDateString('pt-BR');
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2, '0');


    useEffect(() => {
        async function makeQr() {
            if (result > 0) {
                const dataUrl = await gerarQrCodePix(result, empresa.pix, empresa.name, empresa.city);
                setQrCode(dataUrl);
            }
        }
        makeQr();
    }, [result]);

    useEffect(() => {
        (async () => {

            const e = await (window as any).myInfo.get();
            setEmpresa(e);
        })();
    }, []);


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

    }

    // Imprimir direto
    async function handlePrint() {
        if (!notaRef.current) return;

        const canvas = await html2canvas(notaRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // Abre em nova aba para o navegador imprimir
        const win = window.open("");
        if (win) {
            win.document.write(`<img src="${imgData}" style="width:100%">`);
            win.document.close();
            win.print();
        }
    }
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



    let subtitle = dadosRecebidos?.name ?? ""


    return (
        <>

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>
                <div className="p-4">
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="">Adição de Serviços</label>
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
                    ref={notaRef}
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
                    order="XXXX"
                    hours={hours}
                    today={today}
                    minute={minute}
                    obs={obs}
                    cnpj_cpf={dadosRecebidos?.cnpj_cpf}
                    name={dadosRecebidos?.name}
                    company={dadosRecebidos?.company}
                    email={dadosRecebidos?.email}
                    adress={dadosRecebidos?.adress}
                    number={dadosRecebidos?.number}
                    neighborhood={dadosRecebidos?.neighborhood}
                    city={dadosRecebidos?.city}
                    uf={dadosRecebidos?.uf}
                    cep={dadosRecebidos?.cep}
                    complement={dadosRecebidos?.complement}
                    phone={dadosRecebidos?.phone}
                    cell={dadosRecebidos?.cell}
                    totalBruto={totalBruto}
                    desconto={desconto}
                    acrescimo={acrescimo}
                    totalLiquido={totalLiquido}
                    qrCode={qrCode}
                    services={services}
                />

                <div className="grid grid-cols-6 p-4">
                    <ButtonPrinter onClick={handleDownloadPDF} />
                    <div className="col-start-6">
                        <ButtonPrinter onClick={handlePrint} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TemplateFast;
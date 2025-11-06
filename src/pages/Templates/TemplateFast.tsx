import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchService from "../../components/SearchService";
import Input from "../../components/Input";
import { gerarQrCodePix } from "../../service/pix";
import { ButtonPrinter } from "../../components/Button";
import Title from "../../components/Title";
import { Resum } from "../../layout/Resum"
import { Modal } from "../../components/Modal";

type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: number;
}

const TemplateFast = () => {

    //UseSate para cada dado
    const [obs, setObs] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<any>();
    const [acrescimo, setAcrescimo] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenError, setModalOpenError] = useState(false);
    const [modalOpenErrorGerar, setModalOpenErrorGerar] = useState(false);
    const [modalOpenErrorSalvar, setModalOpenErrorSalvar] = useState(false);

    const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);

    const location = useLocation();
    const dadosRecebidos = location.state?.dadosDoFormulario || null

    let result = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acrescimo / 10000));
    let totalLiquido = (totalBruto / 100) - (((totalBruto / 100) * desconto / 100) / 100) + (((totalBruto / 100) * acrescimo / 100) / 100)


    useEffect(() => {
        (async () => {

            const e = await (window as any).myInfo.get();
            setEmpresa(e);
        })();
    }, []);


    if (!empresa) return <p>Necessita dos dados da empresa</p>;

    /////////////////
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

    const data = {
        dataEmissao: new Date().toISOString(),
        pedido: "XXXX",
        totalBruto: totalBruto,
        totalLiquido: totalLiquido,
        acrescimo: acrescimo,
        desconto: desconto,
        obs: obs,
        services: services.map(s => ({
            serviceId: s.serviceId,
            service: s.service,
            qtd: s.qtd,
            valueUnitario: s.value,
            valueTotal: s.qtd * s.value
        }))
    }

    console.log(data)

    async function handleSaveAndGeneratePDF() {


        console.log(data)

        try {

            if (true) {

                const pdfResponse = await (window as any).receipt.generatePdfFast(data, dadosRecebidos);

                if (pdfResponse && pdfResponse.success) {
                    setModalOpen(true);
                } else {
                    setModalOpenErrorGerar(true);
                }
            } else {
                setModalOpenErrorSalvar(true);
            }
        } catch (error) {
            console.error("Erro crítico no processo de salvar e gerar PDF:", error);
            setModalOpenError(true);
        }
    }


    let subtitle = dadosRecebidos?.name ?? ""


    return (
        <>

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>
                <div className="p-4">
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="">Adição de Serviços</label>
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

                <Resum totalBruto={totalBruto} totalLiquido={totalLiquido} services={services} />
                <div className="grid grid-cols-6 p-4">
                    <ButtonPrinter onClick={handleSaveAndGeneratePDF} />
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="PDF Gerado"
                message="PDF gerado com sucesso!"
            />
            <Modal
                isOpen={modalOpenErrorGerar}
                onClose={() => setModalOpenErrorGerar(false)}
                title="Error"
                message="Ocorreu um erro ao gerar o PDF."
            />
            <Modal
                isOpen={modalOpenErrorSalvar}
                onClose={() => setModalOpenErrorSalvar(false)}
                title="Error"
                message="Ocorreu um erro ao salvar o PDF."
            />
            <Modal
                isOpen={modalOpenError}
                onClose={() => setModalOpenError(false)}
                title="Error"
                message="Erro desconhecido, verifique o console."
            />
        </>
    )
}

export default TemplateFast;
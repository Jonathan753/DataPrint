import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchService from "../../components/SearchService";
import Input from "../../components/Input";
import { ButtonPrinter, ButtonReturn } from "../../components/Button";
import Title from "../../components/Title";
import type { Client, Enterprise } from "../../types/global";
import { Resum } from "../../layout/Resum"
import { Modal } from "../../components/Modal";


type Service = {
    serviceId: number,
    qtd: number,
    service: string;
    value: number;
}

const Template = () => {

    const { id } = useParams();
    const [cliente, setCliente] = useState<Client | null>(null);
    const [obs, setObs] = useState('');
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<Enterprise | null>(null);
    const [acrescimo, setAcrescimo] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenError, setModalOpenError] = useState(false);
    const [modalOpenErrorGerar, setModalOpenErrorGerar] = useState(false);
    const [modalOpenErrorSalvar, setModalOpenErrorSalvar] = useState(false);

    const totalBruto = services.reduce((acc, s) => acc + (s.value * s.qtd), 0);

    let totalLiquido = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acrescimo / 10000));


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

    async function handleSaveAndGeneratePDF() {
        if (!cliente) {
            alert("Por favor, selecione um cliente antes de continuar.");
            return;
        }

        // Monta o objeto final com os dados da tela
        const receiptData = {
            clientId: cliente?.clientId,
            dataEmissao: new Date().toISOString(),
            totalBruto: totalBruto,
            desconto: desconto,
            acrescimo: acrescimo,
            totalLiquido: totalLiquido / 100, // Usando sua variável de resultado que já calcula tudo
            obs: obs,
            services: services.map(s => ({
                serviceId: s.serviceId,
                qtd: s.qtd,
                valueUnitario: s.value,
                valueTotal: s.qtd * s.value
            }))
        };

        try {
            console.log("1. Salvando os dados do recibo...");
            const response = await (window as any).receipt.add(receiptData);

            if (response && response.success) {
                const receiptId = response.receiptId;
                console.log(`2. Recibo salvo com ID: ${receiptId}. Solicitando PDF...`);

                const pdfResponse = await (window as any).receipt.generatePdf(receiptId);

                if (pdfResponse && pdfResponse.success) {
                    setModalOpen(true);
                    // alert(`PDF gerado com sucesso!\nSalvo em: ${pdfResponse.path}`);
                } else {
                    setModalOpenErrorGerar(true);
                    // alert(`Ocorreu um erro ao gerar o PDF: ${pdfResponse?.error || 'Erro desconhecido'}`);
                }
            } else {
                setModalOpenErrorSalvar(true);
                // alert(`Ocorreu um erro ao salvar o recibo: ${response?.error || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error("Erro crítico no processo de salvar e gerar PDF:", error);
            // alert("Ocorreu um erro inesperado. Verifique o console para mais detalhes.");
            setModalOpenError(true);
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




    let subtitle = cliente?.name ?? ""


    return (
        <>
            <ButtonReturn />

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>
                <div className="p-4">
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="">Adição de Serviços</label>
                    <SearchService onAdd={addService} />

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

                <div className="flex p-4 justify-end">
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

export default Template;
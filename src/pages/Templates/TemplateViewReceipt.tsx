import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { gerarQrCodePix } from "../../service/pix";
import { ButtonPrinter, ButtonReturn } from "../../components/Button";
import Title from "../../components/Title";
import { Resum2 } from "../../layout/Resum";
import type { Client, Enterprise, Receipt } from "../../types/global";
import { Modal } from "../../components/Modal";


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

    //UseSate para cada dado
    const { id, receipt } = useParams();

    const [cliente, setCliente] = useState<Client | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [empresa, setEmpresa] = useState<Enterprise | null>(null);
    const [receiptView, setReceiptView] = useState<Receipt | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenError, setModalOpenError] = useState(false);
    const [modalOpenErrorGerar, setModalOpenErrorGerar] = useState(false);
    const [modalOpenErrorSalvar, setModalOpenErrorSalvar] = useState(false);

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

    if (!empresa) return <p>Necessita dos dados da empresa</p>;
    if (!receiptView) return <p>Necessita dos dados da empresa</p>;

    /////////////////

    async function handleSaveAndGeneratePDF() {
        if (!cliente) {
            alert("Por favor, selecione um cliente antes de continuar.");
            return;
        }

        try {

            if (true) {
                const pdfResponse = await (window as any).receipt.generatePdf(Number(receipt));

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

    let subtitle = cliente?.name ?? ""


    return (
        <>
            <ButtonReturn />

            <Title title="Criaçao da nota" subtitle={"Nota de " + subtitle} />
            <div style={{ minWidth: "210mm" }}>

                <Resum2 totalBruto={receiptView.totalBruto} totalLiquido={receiptView.totalLiquido} services2={services} desconto={receiptView.desconto} acrescimo={receiptView.acrescimo} />

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

export default TemplateViewReceipt;
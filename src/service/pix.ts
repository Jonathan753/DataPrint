import QRCode from "qrcode";
import { payload } from "pix-payload";

export function gerarPixPayload(valor: number) {
    const data = {
        key: "10958756473",
        name: "Jonathan Erik",
        city: "Recife",
        amount: (valor / 100).toFixed(2),
        transactionId: "NOTA123",
    };

    return payload(data);
}

export async function gerarQrCodePix(valor: number) {
    const pixPayload = gerarPixPayload(valor);
    const dataUrl = await QRCode.toDataURL(pixPayload, { width: 200 });
    return dataUrl;
}

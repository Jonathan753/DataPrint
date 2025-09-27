import QRCode from "qrcode";
import { payload } from "pix-payload";

export function gerarPixPayload(valor: number, key: string, name: string, city:string) {
    const data = {
        key: key,
        name: name,
        city: city,
        amount: (valor / 100).toFixed(2),
        transactionId: name,
    };

    return payload(data);
}

export async function gerarQrCodePix(valor: number, key: string, name: string, city:string) {
    const pixPayload = gerarPixPayload(valor, key, name, city);
    const dataUrl = await QRCode.toDataURL(pixPayload, { width: 200 });
    return dataUrl;
}

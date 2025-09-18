declare module "pix-payload" {
    export interface PixPayloadData {
        key: string;           // chave PIX (cpf, cnpj, e-mail ou aleatória)
        name: string;          // nome do recebedor
        city: string;          // cidade do recebedor
        amount?: string | number; // valor opcional
        transactionId?: string;   // identificador opcional
    }

    export function payload(data: PixPayloadData): string;
}
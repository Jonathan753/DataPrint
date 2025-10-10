import { Receipt } from "lucide-react";

export type Client = {
    clientId: number;
    cnpj_cpf: string;
    name: string;
    company: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    complement: string;
    phone: string;
    cell: string;
}

export type Service = {
    serviceId: number,
    service: string;
    value: number;
}

export type Enterprise = {
    cnpj: string;
    name: string;
    email: string;
    adress: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
    complement: string;
    phone: string;
    cell: string
    salesperson: string;
    pix: string;
}

export type Receipt = {
    receiptId: number,
    clientId: number,
    date: string,
    totalBruto: number,
    desconto: number,
    acrescimo: number,
    totalLiquido: number,
}

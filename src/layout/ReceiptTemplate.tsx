import React from 'react';

// Definindo o tipo para um único serviço, para reutilização
type Service = {
    serviceId: number;
    service: string;
    qtd: number;
    value: number;
}

// Definindo as props que o componente espera receber
type Props = {
    logo: string;
    empresa_adress: string;
    empresa_city: string;
    empresa_uf: string;
    empresa_cep: string;
    empresa_phone: string;
    empresa_cell: string;
    empresa_email: string;
    empresa_cnpj: string;
    empresa_salesperson: string;
    order: string;
    hours: number;
    today: string;
    minute: string;
    obs: string;

    cnpj_cpf: string | undefined;
    name: string | undefined;
    company: string | undefined;
    email: string | undefined;
    adress: string | undefined;
    number: string | undefined;
    neighborhood: string | undefined;
    city: string | undefined;
    uf: string | undefined;
    cep: string | undefined;
    complement: string | undefined;
    phone: string | undefined;
    cell: string | undefined;

    // AQUI A CORREÇÃO: Usamos Service[] para indicar um array de objetos do tipo Service
    services: Service[];

    totalBruto: number;
    desconto: number;
    acrescimo: number;
    totalLiquido: number;

    qrCode: string | null;
}

// A MÁGICA DO FORWARD REF ACONTECE AQUI!
// Envolvemos nosso componente com React.forwardRef.
// Ele recebe dois argumentos genéricos:
// 1. O tipo do elemento da DOM que a ref vai apontar (HTMLDivElement)
// 2. O tipo das props que o nosso componente recebe (Props)
// A função do componente agora recebe 'props' e 'ref' como argumentos.
const ReceiptTemplate = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div className="template border bg-zinc-700 border-black border-1 p-2 mt-4">
            {/* A 'ref' que recebemos do componente pai é passada diretamente para esta div */}
            <div ref={ref} id="nota" style={{ width: '210mm', minHeight: '297mm' }} className="bg-white mx-auto p-8 shadow-lg">
                {/* O restante do seu JSX continua exatamente o mesmo, usando 'props' */}
                <div className="px-6 grid grid-cols-3 gap-2">
                    <img className="my-auto p-2" src={props.logo} alt="" />
                    <div className="grid grid-rows-5 col-span-2 p-2 px-4">
                        <p>Endereço: {props.empresa_adress}</p>

                        <div className="flex">
                            <p className='w-2/5'>Cidade: {props.empresa_city}</p>
                            <p className='w-1/6'>UF: {props.empresa_uf}</p>
                            <p className='w-1/3'>CEP: {props.empresa_cep}</p>
                        </div>

                        <div className="flex gap-4">
                            <p>Telefone: {props.empresa_phone}</p>
                            <p>Cel: {props.empresa_cell}</p>
                        </div>
                        <p>Email: {props.empresa_email}</p>
                        <p>CNPJ: {props.empresa_cnpj}</p>
                    </div>
                </div>
                <hr className="border-black border-collapse mt-2" />

                <div className="flex justify-center gap-20">
                    <p>Vendedor: {props.empresa_salesperson}</p>
                    <p>Pedido: {(props.order).toString().padStart(4, "0")}</p>
                    <p>Emissão: {props.today}</p>
                    <p>Hora: {props.hours}:{props.minute}</p>
                </div>

                <hr className="border-black border-collapse mt-2" />
                {/* ... (o resto do seu JSX para cliente, etc. continua aqui) ... */}
                <div className="grid grid-cols-3">
                    <p>Nome: {props.name}</p>
                    <p>Telefone: {props.phone}</p>
                    <p>Cel: {props.cell}</p>
                </div>
                <div className="grid grid-cols-3">
                    <p>Razão: {props.company}</p>
                    <p>CNPJ/CPF: {props.cnpj_cpf}</p>
                </div>
                <div className="grid grid-cols-3">
                    <p>Email: {props.email}</p>
                    <p>Contato: {props.phone}</p>
                </div>
                <div className="grid grid-cols-8">
                    <p className='col-span-3'>End: {props.adress}</p>
                    <p>Nº: {props.number}</p>
                    <p className='col-span-2'>Bairro: {props.neighborhood}</p>
                    <p className='col-span-2'>Compl.: {props.complement}</p>
                </div>
                <div className="grid grid-cols-3">
                    <p>Cidade: {props.city}</p>
                    <p>UF: {props.uf}</p>
                    <p>CEP: {props.cep}</p>
                </div>
                <div className="w-full">
                    <p className="break-words">Obs.: {props.obs}</p>
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
                        {props.services.map((s, idx) => (
                            <tr key={idx}>
                                <td >{s.serviceId}</td>
                                <td>{s.service}</td>
                                <td> {s.qtd} </td>
                                <td>{
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(s.value / 100)
                                }</td>
                                <td>{

                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format((s.value / 100) * s.qtd)
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
                                }).format(props.totalBruto / 100)
                            }
                        </h2>
                        <h2>Desconto: {
                            new Intl.NumberFormat("pt-BR").format(props.desconto / 100)
                        } %</h2>
                        <h2>Acrésssimo: {
                            new Intl.NumberFormat("pt-BR").format(props.acrescimo / 100)
                        } %</h2>
                        <h1 className="text-3xl">Total Liq: {
                            new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(props.totalLiquido / 100)
                        }</h1>
                    </div>
                    <div>
                        <div className="border-black border-solid border-2 w-36 m-auto">
                            {props.qrCode && (
                                <img src={props.qrCode} alt="QR Code Pix" className="w-32 h-32 m-auto" />
                            )}
                        </div>
                        <h3 className="text-center">QR Code PIX</h3>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReceiptTemplate;
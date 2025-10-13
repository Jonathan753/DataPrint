type Props = {
    notaRef: React.RefObject<HTMLDivElement | null>;
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
    order: number;
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

    services: [{
        serviceId: number,
        service: string,
        qtd: number,
        value: number,
    }
    ];
    // serviceId: number;

    totalBruto: number;
    desconto: number;
    acrescimo: number;
    totalLiquido: number;

    qrCode: string|null;

}

const ReceiptTemplate = ({ ...props }: Props) => {
    return (
        <>
            <div className="template border bg-zinc-700 border-black border-1 p-2 mt-4">
                <div ref={props.notaRef} id="nota" style={{ width: '210mm', minHeight: '297mm' }} className="bg-white mx-auto p-8 shadow-lg">
                    <div className="grid grid-cols-3 gap-2">
                        <img className="my-auto" src={props.logo} alt="" />
                        <div className="grid grid-rows-5 col-span-2 p-2 px-4">
                            <p>Endereço: {props.empresa_adress}</p>
                            <div className="grid grid-cols-3">
                                <p>Cidade: {props.empresa_city}</p>
                                <p>UF: {props.empresa_uf}</p>
                                <p>CEP: {props.empresa_cep}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Telefone: {props.empresa_phone}</p>
                                <p>Cel: {props.empresa_cell}</p>
                            </div>
                            <p>Email: {props.empresa_email}</p>
                            <p>CNPJ: {props.empresa_cnpj}</p>
                        </div>
                    </div>
                    <hr className="border-black border-collapse mt-2" />
                    <div className="grid grid-cols-4">
                        <p>Vendedor: {props.empresa_salesperson}</p>
                        <p>Pedido: {(props.order + 1).toString().padStart(4, "0")}</p>
                        <p>Emissão: {props.today}</p>
                        <p>Hora: {props.hours}:{props.minute}</p>
                    </div>
                    <hr className="border-black border-collapse mt-2" />
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
                    <div className="grid grid-cols-4">
                        <p>End: {props.adress}</p>
                        <p>Nº: {props.number}</p>
                        <p>Bairro: {props.neighborhood}</p>
                        <p>Compl.: {props.complement}</p>
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
        </>
    )
}

export default ReceiptTemplate;

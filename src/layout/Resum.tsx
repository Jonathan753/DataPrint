
type Service = {
    serviceId: number;
    service: string;
    qtd: number;
    value: number;
}

type Props = {
    totalBruto: number;
    totalLiquido: number;
    acrescimo?: number;
    desconto?: number;
    services?: Service[];
    services2?: Service2[];
}

type Service2 = {
    id: number;
    receiptId: number;
    serviceId: number;
    qtd: number;
    valueUnitario: number;
    valueTotal: number;
    service: string;
}

const Resum = (props: Props) => {
    return (
        <>
            <div className="p-4 bg-background-surface w-3/4 mx-auto rounded-md shadow-md">
                <h3 className="font-medium">Resumo da Nota:</h3>
                <table className="w-full mb-8">
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
                        {props.services && props.services.map((s, idx) => (
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


                <h2>Total Bruto:
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(props.totalBruto / 100)
                    }
                </h2>
                <h1 className="text-3xl">Total Liq: {
                    new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(props.totalLiquido / 100)
                }</h1>
            </div>
        </>
    )
}

const Resum2 = ({ totalBruto, totalLiquido, services2, desconto = 0, acrescimo = 0 }: Props) => {
    return (
        <>
            <div className="p-4 bg-background-surface w-3/4 mx-auto rounded-md shadow-md">
                <h3 className="font-medium">Reumo da Nota:</h3>
                <table className="w-full mb-8">
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
                        {services2 && services2.map((s, idx) => (
                            <tr key={idx}>
                                <td >{s.serviceId}</td>
                                <td>{s.service}</td>
                                <td> {s.qtd} </td>
                                <td>{
                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(s.valueUnitario / 100)
                                }</td>
                                <td>{

                                    new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format((s.valueTotal / 100))
                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>Desconto:
                    {
                        (desconto / 100) + " % "
                    }
                </h2>
                <h2>Acrescimo:
                    {

                        (acrescimo / 100) + " % "

                    }
                </h2>
                <h2>Total Bruto:
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(totalBruto / 100)
                    }
                </h2>
                <h1 className="text-3xl">Total Liq: {
                    new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(totalLiquido)
                }</h1>
            </div>
        </>
    )
}
export { Resum, Resum2 };
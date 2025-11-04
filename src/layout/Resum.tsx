
type Service = {
    serviceId: number;
    service: string;
    qtd: number;
    value: number;
}

type Props = {
    totalBruto: number;
    totalLiquido: number;
    services: Service[]
}
const Resum = (props: Props) => {
    return (
        <>
            <div className="p-4 bg-background-surface w-3/4 mx-auto rounded-md shadow-md">
                <h3 className="font-medium">Produtos na Nota:</h3>
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
export default Resum;
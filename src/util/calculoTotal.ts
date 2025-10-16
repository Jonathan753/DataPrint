type Props = {
    totalBruto: number;
    desconto: number;
    acrescimo: number;
}

const calculoTotal = ({ totalBruto, desconto, acrescimo }: Props) => {
    let totalLiquido = (totalBruto) - (totalBruto * (desconto / 10000)) + (totalBruto * (acrescimo / 10000));
    return totalLiquido;
}

export {calculoTotal};
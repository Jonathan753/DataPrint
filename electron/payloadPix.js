/**
 * Calcula o CRC16 (Cyclic Redundancy Check) para o payload do Pix.
 * Esta função é um "checksum" que garante a integridade dos dados do QR Code.
 * @param {string} payload - O payload Pix completo, sem o CRC16.
 * @returns {string} O valor do CRC16 calculado, formatado com 4 caracteres.
 */
function crc16(payload) {
    let crc = 0xFFFF;
    const polinomio = 0x1021;

    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = (crc & 0x8000) ? (crc << 1) ^ polinomio : crc << 1;
        }
    }
    
    // Converte para hexadecimal, garante 4 caracteres e coloca em maiúsculas
    return ('0000' + (crc & 0xFFFF).toString(16).toUpperCase()).slice(-4);
}

/**
 * Formata um campo individual do payload (ID-Tamanho-Valor).
 * @param {string} id - O ID do campo.
 * @param {string} valor - O valor do campo.
 * @returns {string} O campo formatado.
 */
function formatarCampo(id, valor) {
    const tamanho = valor.length.toString().padStart(2, '0');
    return `${id}${tamanho}${valor}`;
}

/**
 * Gera a string completa do payload PIX para um QR Code estático com valor definido.
 * @param {string} chavePix - A chave Pix do recebedor.
 * @param {string} nomeRecebedor - O nome do recebedor (sem acentos, max 25 chars).
 * @param {string} cidadeRecebedor - A cidade do recebedor (sem acentos, max 15 chars).
 * @param {string|number} valor - O valor da transação.
 * @param {string} [txid='***'] - Um ID de transação opcional. '***' indica que não é necessário.
 * @returns {string} O payload completo pronto para ser transformado em QR Code.
 */
function geraPayloadPix(chavePix, nomeRecebedor, cidadeRecebedor, valor) {
    // Remove acentos e caracteres especiais para garantir compatibilidade
    nomeRecebedor = nomeRecebedor.substring(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    cidadeRecebedor = cidadeRecebedor.substring(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    valor = parseFloat(valor).toFixed(2);

    // Bloco 26: Informações da Conta do Vendedor
    const merchantAccountInfo = [
        formatarCampo('00', 'br.gov.bcb.pix'),
        formatarCampo('01', chavePix)
    ].join('');

    const payload = [
        formatarCampo('00', '01'), // Payload Format Indicator
        formatarCampo('26', merchantAccountInfo),
        formatarCampo('52', '0000'), // Merchant Category Code (0000 para não especificado)
        formatarCampo('53', '986'), // Transaction Currency (986 = BRL)
        formatarCampo('54', valor),
        formatarCampo('58', 'BR'), // Country Code
        formatarCampo('59', nomeRecebedor),
        formatarCampo('60', cidadeRecebedor),
        formatarCampo('62', formatarCampo('05', '***')), // Transaction ID
    ].join('');

    // Adiciona o CRC16 no final
    const payloadComCRC = `${payload}6304`;
    const crcResult = crc16(payloadComCRC);

    return `${payloadComCRC}${crcResult}`;
}

// Exporta a função para que outros arquivos possam usá-la
module.exports = { geraPayloadPix };
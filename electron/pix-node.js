// pix-node.js
const QRCode = require('qrcode');
// A linha mais importante: importa a lógica que acabamos de criar!
const { geraPayloadPix } = require('./payloadPix'); 

async function gerarQrCodePixNode(valor, chavePix, nome, cidade) {
    // Converte o valor de centavos (ex: 1750) para formato monetário (ex: 17.50)
    const valorFloat = valor / 100;
    
    const payload = geraPayloadPix(chavePix, nome, cidade, valorFloat);
    console.log("Payload PIX Gerado:", payload); // Ótimo para debugar!

    // Retorna o QR Code como uma imagem em Base64
    return await QRCode.toDataURL(payload);
}

module.exports = { gerarQrCodePixNode };
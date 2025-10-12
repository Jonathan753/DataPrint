// pix-node.js
const QRCode = require('qrcode');
const { geraPayloadPix } = require('../src/service/pix.ts'); // Supondo que você tenha a lógica do payload separada

async function gerarQrCodePixNode(valor, chavePix, nome, cidade) {
    const payload = geraPayloadPix(chavePix, nome, cidade, valor.toFixed(2));
    return await QRCode.toDataURL(payload);
}

module.exports = { gerarQrCodePixNode };
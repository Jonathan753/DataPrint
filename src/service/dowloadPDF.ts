

export default  const dowloadPDF = () => {

    async function handleDownloadPDF() {
        if (!notaRef.current) return;

const canvas = await html2canvas(notaRef.current, { scale: 2 });
const imgData = canvas.toDataURL("image/png");
const pdf = new jsPDF("p", "mm", "a4");

const pageWidth = pdf.internal.pageSize.getWidth();
// const pageHeight = pdf.internal.pageSize.getHeight();
const imgProps = pdf.getImageProperties(imgData);
const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
pdf.save(`recibo_${(order + 1).toString().padStart(4, "0")}.pdf`);

await (window as any).receipt.add(receipt);
    }
} 
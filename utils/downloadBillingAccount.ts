import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export async function downloadBillingAccountPDF() {
  const element = document.getElementById("billing-account");
  if (!element) {
    console.error("Elemento 'billing-account' no encontrado.");
    return;
  }
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
  });

  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("cuenta-cobro.pdf");
}

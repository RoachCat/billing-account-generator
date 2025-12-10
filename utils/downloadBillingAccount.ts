import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { User } from "./users";
import sanitizeString from "./string";

export async function downloadBillingAccountPDF(user: User) {
  const element = document.getElementById("billing-account");
  if (!element) {
    console.error("Elemento 'billing-account' no encontrado.");
    return;
  }
  const canvas = await html2canvas(element, {
    scale: 1,
    useCORS: true,
    allowTaint: true,
    logging: true,
  });

  const data = canvas.toDataURL("image/jpeg", 0.8);

  const pdf = new jsPDF();
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`cuenta-cobro-${sanitizeString(user.name)}.pdf`);
}

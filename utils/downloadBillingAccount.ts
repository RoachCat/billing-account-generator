import jsPDF from "jspdf";
import { User } from "./users";
import { Customer } from "./customers";
import addDotsToNumber from "./addDotsToNumber";
import sanitizeString from "./string";

interface DownloadBillingAccountProps {
  user: User;
  customer: Customer;
  value?: number;
}

export async function downloadBillingAccountPDF({
  user,
  customer,
  value = 1000000,
}: DownloadBillingAccountProps) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const marginX = 20;
  let cursorY = 25;

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const today = new Date();
  const longDate = `${today.getDate()} de ${
    months[today.getMonth()]
  } de ${today.getFullYear()}`;

  const formattedValue = addDotsToNumber(value);
  const valueInWords = `${formattedValue} pesos`;
  const concept = "Desarrollo de Software de Raizco Core App";

  // fecha alineada a la derecha
  pdf.setFontSize(11);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    `${user.city || "Itagüí"}, ${longDate}`,
    pageWidth - marginX,
    cursorY,
    { align: "right" }
  );

  cursorY += 10;

  // título
  pdf.setFontSize(11);
  pdf.setFont("Helvetica", "bold");
  pdf.text("CUENTA DE COBRO", marginX, cursorY);

  cursorY += 10;

  const contentWidth = pageWidth - marginX * 2;

  // párrafo principal con partes en negrilla
  const paragraphParts: { text: string; bold: boolean }[] = [
    { text: "La empresa ", bold: false },
    { text: customer.name, bold: true },
    { text: " identificada con NIT ", bold: false },
    { text: customer.identification, bold: true },
    { text: " debe a ", bold: false },
    { text: user.name, bold: true },
    { text: " identificado con Cédula de Ciudadanía ", bold: false },
    { text: user.id, bold: true },
    { text: " de ", bold: false },
    { text: user.city ?? "Itagüí", bold: true },
    { text: " la suma de ", bold: false },
    { text: valueInWords, bold: true },
    { text: " ($", bold: false },
    { text: formattedValue, bold: true },
    { text: ") por concepto de: ", bold: false },
    { text: concept, bold: true },
    { text: ".", bold: false },
  ];

  let currentLine = "";
  const lines: { parts: { text: string; bold: boolean }[] }[] = [];
  let currentParts: { text: string; bold: boolean }[] = [];

  paragraphParts.forEach((part) => {
    const tentative = currentLine + part.text;
    const tentativeWidth = pdf.getTextWidth(tentative);

    if (tentativeWidth > contentWidth && currentLine !== "") {
      lines.push({ parts: currentParts });
      currentLine = part.text;
      currentParts = [part];
    } else {
      currentLine = tentative;
      currentParts.push(part);
    }
  });

  if (currentParts.length) {
    lines.push({ parts: currentParts });
  }

  pdf.setFontSize(11);

  lines.forEach((line) => {
    let x = marginX;
    line.parts.forEach((part) => {
      pdf.setFont("Helvetica", part.bold ? "bold" : "normal");
      pdf.text(part.text, x, cursorY);
      x += pdf.getTextWidth(part.text);
    });
    cursorY += 6;
  });

  cursorY += 4;

  // declaración
  const declaration =
    "“Declaro bajo la gravedad de juramento que no enfrentaré costos y gastos a estas rentas al final del año, por lo cual solicito aplicar el artículo 383 del ET. *No sujeto a retención en la fuente ya que el pago es inferior a 95 UVT según el artículo 383 del estatuto tributario”.";
  const declarationLines = pdf.splitTextToSize(
    declaration,
    contentWidth
  ) as string[];
  declarationLines.forEach((line: string) => {
    pdf.setFont("Helvetica", "normal");
    pdf.text(line, marginX, cursorY);
    cursorY += 6;
  });

  cursorY += 6;

  // cordialmente
  pdf.text("Cordialmente:", marginX, cursorY);

  cursorY += 12;

  // datos del emisor
  pdf.setFont("Helvetica", "normal");
  pdf.text(user.name, marginX, cursorY);
  cursorY += 6;
  const ccLabel = "CC:";
  pdf.setFont("Helvetica", "bold");
  pdf.text(ccLabel, marginX, cursorY);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    ` ${user.id}`,
    marginX + pdf.getTextWidth(ccLabel) + 2,
    cursorY
  );
  if (user.phone) {
    cursorY += 6;
    const phoneLabel = "Celular:";
    pdf.setFont("Helvetica", "bold");
    pdf.text(phoneLabel, marginX, cursorY);
    pdf.setFont("Helvetica", "normal");
    pdf.text(
      ` ${user.phone}`,
      marginX + pdf.getTextWidth(phoneLabel) + 2,
      cursorY
    );
  }
  if (user.address) {
    cursorY += 6;
    const addressLabel = "Dirección:";
    pdf.setFont("Helvetica", "bold");
    pdf.text(addressLabel, marginX, cursorY);
    pdf.setFont("Helvetica", "normal");
    pdf.text(
      ` ${user.address}`,
      marginX + pdf.getTextWidth(addressLabel) + 2,
      cursorY
    );
  }
  cursorY += 6;
  const emailLabel = "Email:";
  pdf.setFont("Helvetica", "bold");
  pdf.text(emailLabel, marginX, cursorY);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    ` ${user.email}`,
    marginX + pdf.getTextWidth(emailLabel) + 2,
    cursorY
  );

  cursorY += 8;

  // datos bancarios
  const bankLabel = "Banco:";
  pdf.setFont("Helvetica", "bold");
  pdf.text(bankLabel, marginX, cursorY);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    ` ${user.bank}`,
    marginX + pdf.getTextWidth(bankLabel) + 2,
    cursorY
  );
  cursorY += 6;
  const accountTypeLabel = "Tipo de cuenta:";
  pdf.setFont("Helvetica", "bold");
  pdf.text(accountTypeLabel, marginX, cursorY);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    ` ${user.bankAccountType}`,
    marginX + pdf.getTextWidth(accountTypeLabel) + 2,
    cursorY
  );
  cursorY += 6;
  const accountNumberLabel = "Número de cuenta:";
  pdf.setFont("Helvetica", "bold");
  pdf.text(accountNumberLabel, marginX, cursorY);
  pdf.setFont("Helvetica", "normal");
  pdf.text(
    ` ${user.billingAccountNumber}`,
    marginX + pdf.getTextWidth(accountNumberLabel) + 2,
    cursorY
  );

  pdf.save(`cuenta-cobro-${sanitizeString(user.name)}.pdf`);
}

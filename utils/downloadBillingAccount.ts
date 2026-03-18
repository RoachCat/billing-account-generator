import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toCardinal } from "n2words/es-ES";
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
  const typedPdfMake = pdfMake as unknown as { vfs: unknown };
  const fontsSource = pdfFonts as unknown as {
    pdfMake?: { vfs?: unknown };
    default?: { pdfMake?: { vfs?: unknown } };
  };
  const vfs =
    fontsSource.pdfMake?.vfs ?? fontsSource.default?.pdfMake?.vfs ?? undefined;
  if (vfs) {
    typedPdfMake.vfs = vfs;
  }

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
  const valueInteger = Math.round(value);
  const cardinal = toCardinal(valueInteger);
  const valueInWords =
    valueInteger === 1_000_000 ? `${cardinal} de pesos` : `${cardinal} pesos`;
  const concept = "Desarrollo de Software de Raizco Core App";

  const content: pdfMake.Content[] = [];

  content.push({
    text: `${user.city || "Itagüí"}, ${longDate}`,
    alignment: "right",
    fontSize: 11,
    margin: [0, 0, 0, 16],
  });

  content.push({
    text: "CUENTA DE COBRO",
    bold: true,
    fontSize: 11,
    margin: [0, 0, 0, 12],
  });

  content.push({
    text: [
      "La empresa ",
      { text: customer.name, bold: true },
      " identificada con NIT ",
      { text: customer.identification, bold: true },
      " debe a ",
      { text: user.name, bold: true },
      " identificado con Cédula de Ciudadanía ",
      { text: user.id, bold: true },
      " de ",
      { text: user.city ?? "Itagüí", bold: true },
      " la suma de ",
      { text: valueInWords, bold: true },
      " ($",
      { text: formattedValue, bold: true },
      ") por concepto de: ",
      { text: concept, bold: true },
      ".",
    ],
    fontSize: 11,
    lineHeight: 1.2,
    margin: [0, 0, 0, 8],
  });

  content.push({
    text: "“Declaro bajo la gravedad de juramento que no enfrentaré costos y gastos a estas rentas al final del año, por lo cual solicito aplicar el artículo 383 del ET. *No sujeto a retención en la fuente ya que el pago es inferior a 95 UVT según el artículo 383 del estatuto tributario”.",
    fontSize: 11,
    lineHeight: 1.2,
    margin: [0, 0, 0, 12],
  });

  content.push({
    text: "Cordialmente:",
    fontSize: 11,
    margin: [0, 0, 0, 16],
  });

  content.push({
    text: user.name,
    fontSize: 11,
  });

  content.push({
    text: [
      { text: "CC:", bold: true },
      ` ${user.id}`,
    ],
    fontSize: 11,
    margin: [0, 2, 0, 0],
  });

  if (user.phone) {
    content.push({
      text: [
        { text: "Celular:", bold: true },
        ` ${user.phone}`,
      ],
      fontSize: 11,
      margin: [0, 2, 0, 0],
    });
  }

  if (user.address) {
    content.push({
      text: [
        { text: "Dirección:", bold: true },
        ` ${user.address}`,
      ],
      fontSize: 11,
      margin: [0, 2, 0, 0],
    });
  }

  content.push({
    text: [
      { text: "Email:", bold: true },
      ` ${user.email}`,
    ],
    fontSize: 11,
    margin: [0, 2, 0, 8],
  });

  content.push({
    text: [
      { text: "Banco:", bold: true },
      ` ${user.bank}`,
    ],
    fontSize: 11,
    margin: [0, 2, 0, 0],
  });

  content.push({
    text: [
      { text: "Tipo de cuenta:", bold: true },
      ` ${user.bankAccountType}`,
    ],
    fontSize: 11,
    margin: [0, 2, 0, 0],
  });

  content.push({
    text: [
      { text: "Número de cuenta:", bold: true },
      ` ${user.billingAccountNumber}`,
    ],
    fontSize: 11,
    margin: [0, 2, 0, 0],
  });

  const docDefinition = {
    content,
    defaultStyle: {
      fontSize: 11,
    },
    pageMargins: [60, 40, 60, 40] as [number, number, number, number],
  };

  pdfMake.createPdf(docDefinition).download(
    `cuenta-cobro-${sanitizeString(user.name)}.pdf`
  );
}

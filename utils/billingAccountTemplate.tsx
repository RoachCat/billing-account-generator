import addDotsToNumber from "./addDotsToNumber";
import { Customer } from "./customers";
import { User } from "./users";

export interface GenerateBillingAccountProps {
  user: User;
  customer: Customer;
  tasks?: string[];
  value?: number;
}

export default function BillingAccountTemplate({
  user,
  customer,
  tasks = [],
  value = 1000000,
}: GenerateBillingAccountProps) {
  function getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function getLongDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

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

    return `${day} de ${months[month]} de ${year}`;
  }

  const formattedValue = addDotsToNumber(value);
  const valueInWords = `${formattedValue} pesos`;
  const concept =
    tasks && tasks.length > 0
      ? tasks.join("; ")
      : "Desarrollo de Software de Raizco Core App";

  return (
    <main
      id="billing-account"
      style={{
        padding: "40px 60px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        maxWidth: "780px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "30px",
          fontSize: "14px",
        }}
      >
        <span>
          {user?.city || "Itagüí"}, {getLongDate()}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "14px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            CUENTA DE COBRO
          </h3>
        </div>
      </div>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "14px",
          lineHeight: 1.5,
        }}
      >
        <p style={{ margin: 0 }}>
          La empresa <strong>{customer?.name}</strong> identificada con NIT{" "}
          <strong>{customer?.identification}</strong> debe a{" "}
          <strong>{user?.name}</strong> identificado con Cédula de Ciudadanía{" "}
          <strong>{user?.id}</strong> de <strong>{user?.city}</strong> la suma
          de <strong>{valueInWords}</strong> (
          <strong>${formattedValue}</strong>) por concepto de:{" "}
          <strong>{concept}</strong>.
        </p>
        <p style={{ margin: 0 }}>
          “Declaro bajo la gravedad de juramento que no enfrentaré costos y
          gastos a estas rentas al final del año, por lo cual solicito aplicar
          el artículo 383 del ET. *No sujeto a retención en la fuente ya que el
          pago es inferior a 95 UVT según el artículo 383 del estatuto
          tributario”.
        </p>

        <p style={{ margin: 0 }}>Cordialmente:</p>

        <div>
          <p style={{ margin: 0 }}>{user?.name}</p>
          <p style={{ margin: 0 }}>
            <strong>CC:</strong> {user?.id}
          </p>
          {user?.phone ? (
            <p style={{ margin: 0 }}>
              <strong>Celular:</strong> {user.phone}
            </p>
          ) : null}
          {user?.address ? (
            <p style={{ margin: 0 }}>
              <strong>Dirección:</strong> {user.address}
            </p>
          ) : null}
          <p style={{ margin: 0 }}>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div style={{ marginTop: "16px" }}>
          <p style={{ margin: 0 }}>
            <strong>Banco:</strong> {user?.bank}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Tipo de cuenta:</strong> {user?.bankAccountType}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Número de cuenta:</strong> {user?.billingAccountNumber}
          </p>
        </div>
      </section>
    </main>
  );
}

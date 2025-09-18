import { Customer } from "./customers";
import { User } from "./users";

export interface GenerateBillingAccountProps {
  user: User;
  customer: Customer;
  tasks: string[];
}

export default function BillingAccountTemplate({
  user,
  customer,
  tasks,
}: GenerateBillingAccountProps) {
  function getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <main
      id="billing-account"
      style={{
        padding: "10px 30px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
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
              fontSize: "25px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            CUENTA DE COBRO
          </h3>
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Fecha</strong>:{" "}
            <span style={{ textDecoration: "underline" }}>
              {getCurrentDate()}
            </span>
          </li>
        </ul>
      </div>

      <section
        style={{ display: "flex", flexDirection: "column", gap: "13px" }}
      >
        <div>
          <h3
            style={{
              fontSize: "20px",
              borderBottom: "1px solid #000000",
              width: "100%",
              display: "inline-block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Cliente
          </h3>
          <div style={{ marginBottom: "5px" }}>
            <p style={{ margin: 0 }}>
              <strong>Proyecto/Concepto:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>
                Raizco Core App
              </span>
            </p>
          </div>
          <div>
            <p style={{ margin: 0 }}>
              <strong>Cliente:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>
                {customer?.name}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h3
            style={{
              fontSize: "20px",
              borderBottom: "1px solid #000000",
              width: "100%",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            A nombre de (quien cobra)
          </h3>
          <div style={{ marginBottom: "5px" }}>
            <p style={{ margin: 0 }}>
              <strong>Nombre:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>{user?.name}</span>
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={{ margin: 0 }}>
              <strong>CC / NIT:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>{user?.id}</span>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Correo electrónico:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>{user?.email}</span>
            </p>
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: "20px",
              borderBottom: "1px solid #000000",
              width: "100%",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Medio de pago
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "5px",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Banco:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>{user?.bank}</span>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Tipo de cuenta:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>
                {user?.bankAccountType}
              </span>
            </p>
            <p style={{ margin: 0 }}>
              <strong>N° de cuenta:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>
                {user?.billingAccountNumber}
              </span>
            </p>
            <p style={{ margin: 0 }}>
              <strong>Titular:</strong>{" "}
              <span style={{ textDecoration: "underline" }}>{user?.name}</span>
            </p>
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              borderBottom: "1px solid #000000",
              width: "42%",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
              Valor total a pagar:
            </h3>
            <h3>$1'000.000</h3>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "20px" }}>
        <h3
          style={{
            fontSize: "20px",
            borderBottom: "1px solid #000000",
            width: "100%",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          ACTIVIDADES REALIZADAS
        </h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <li key={index}>- {task}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

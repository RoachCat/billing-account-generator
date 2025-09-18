export interface User {
  id: string;
  name: string;
  email: string;
  billingAccountNumber: string;
  bankAccountType: "Ahorros" | "Corriente";
  bank: string;
}

export const users: User[] = [
  {
    id: "1038415688",
    name: "Sebastián Giraldo Martínez",
    email: "sebagiro@gmail.com",
    billingAccountNumber: "41200034536",
    bankAccountType: "Ahorros",
    bank: "Bancolombia",
  },
  {
    id: "1000835528",
    name: "Andrés Gómez",
    email: "personalandres5@gmail.com",
    billingAccountNumber: "27500001760",
    bankAccountType: "Ahorros",
    bank: "Bancolombia",
  },
];

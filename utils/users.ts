export interface User {
  id: string;
  name: string;
  email: string;
  billingAccountNumber: string;
  bankAccountType: "Ahorros" | "Corriente";
  bank: string;
  phone?: string;
  address?: string;
  city?: string;
  signatureUrl?: string;
}

export const users: User[] = [
  {
    id: "1038415688",
    name: "Sebastián Giraldo Martínez",
    email: "sebagiro@gmail.com",
    billingAccountNumber: "41200034536",
    bankAccountType: "Ahorros",
    bank: "Bancolombia",
    phone: "3122104787",
    address: "Calle 50 #46-16. Apto 302. Itagüí",
    city: "Itagüí",
  },
  {
    id: "1000835528",
    name: "Andrés Gómez",
    email: "personalandres5@gmail.com",
    billingAccountNumber: "27500001760",
    bankAccountType: "Ahorros",
    bank: "Bancolombia",
    phone: "3054463840",
    address: "Calle 26 Sur # 43 A 41. Envigado",
    city: "Envigado",
  },
];

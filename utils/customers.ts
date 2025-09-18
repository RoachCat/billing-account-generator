export interface Customer {
  name: string;
  identification: string;
  email?: string;
  phone?: string;
}

export const customers: Customer[] = [
  {
    name: "Raizco SAS",
    identification: "9014496654",
  },
];

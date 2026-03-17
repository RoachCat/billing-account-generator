"use client";

import UserSelector from "@/components/UserSelector";
import CustomerSelector from "@/components/CustomerSelector";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User } from "@/utils/users";
import { Customer } from "@/utils/customers";
import { downloadBillingAccountPDF } from "@/utils/downloadBillingAccount";
import BillingValue from "@/components/BillingValue";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [customer, setCustomer] = useState<Customer>();
  const [billingValue, setBillingValue] = useState<number>();

  const generateBillingAccount = async () => {
    if (!user || !customer) return;
    document.body.style.cursor = "wait";
    await downloadBillingAccountPDF({
      user,
      customer,
      value: billingValue,
    });
    document.body.style.cursor = "default";
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1 className="font-bold text-2xl">GENERADOR DE CUENTAS DE COBRO</h1>
        </div>
        <section className="flex flex-wrap gap-5">
          <div className="lg:w-[calc(33.33%-13.33px)]">
            <UserSelector setUser={setUser} />
          </div>

          <div className="lg:w-[calc(33.33%-13.33px)]">
            <CustomerSelector setCustomer={setCustomer} />
          </div>

          <div className="lg:w-[calc(33.33%-13.33px)]">
            <BillingValue onBillingValue={setBillingValue} />
          </div>
        </section>
        <div className="flex justify-center w-full">
          <Button onClick={generateBillingAccount} className="cursor-pointer">
            Generar
          </Button>
        </div>
      </main>
    </div>
  );
}

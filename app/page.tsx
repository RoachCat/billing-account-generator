"use client";

import UserSelector from "@/components/UserSelector";
import TasksList from "@/components/TasksList";
import CustomerSelector from "@/components/CustomerSelector";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User } from "@/utils/users";
import { Customer } from "@/utils/customers";
import BillingAccountTemplate from "@/utils/billingAccountTemplate";
import { downloadBillingAccountPDF } from "@/utils/downloadBillingAccount";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [customer, setCustomer] = useState<Customer>();
  const [tasks, setTasks] = useState<string[]>([]);

  const generateBillingAccount = () => {
    if (!user || !customer || !tasks?.length) return;
    downloadBillingAccountPDF();
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1 className="font-bold text-2xl">GENERADOR DE CUENTAS DE COBRO</h1>
        </div>
        <section className="flex gap-5">
          <UserSelector setUser={setUser} />
          <CustomerSelector setCustomer={setCustomer} />
        </section>
        <TasksList setTasks={setTasks} />
        <div className="flex justify-center w-full">
          <Button onClick={generateBillingAccount} className="cursor-pointer">
            Generar
          </Button>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
          }}
        >
          <BillingAccountTemplate
            user={user!}
            customer={customer!}
            tasks={tasks!}
          />
        </div>
      </main>
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customers } from "@/utils/customers";

export default function CustomerSelector({
  setCustomer,
}: {
  setCustomer: (customer: typeof customers[number] | undefined) => void;
}) {
  const onValueChange = (identification: string) => {
    const customer = customers.find(
      (customer) => customer.identification === identification
    );
    setCustomer(customer);
  };

  return (
    <div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Escoge un cliente" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((item, index) => (
            <SelectItem value={item.identification} key={index}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

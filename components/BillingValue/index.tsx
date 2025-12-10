import { useState, useMemo } from "react";
import { Input } from "../ui/input";

interface BillingValueProps {
  onBillingValue?: (value: number | undefined) => void;
}

const formatNumberWithDots = (num: number | undefined): string => {
  if (num === undefined || num === null) {
    return "";
  }
  return num.toLocaleString("es-CO");
};

export default function BillingValue({ onBillingValue }: BillingValueProps) {
  const [value, setValue] = useState<number | undefined>(1000000);

  const formattedValue = useMemo(() => {
    return formatNumberWithDots(value);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericString = rawValue.replace(/\D/g, "");
    const newValue = numericString ? parseInt(numericString, 10) : undefined;
    setValue(newValue);
    if (onBillingValue) {
      onBillingValue(newValue);
    }
  };

  return (
    <div className="w-[180px]">
      <Input
        type="text"
        placeholder="Valor a cobrar"
        value={'$'+formattedValue}
        onChange={onChange}
        className="text-sm"
      />
    </div>
  );
}

import { Prisma } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor={name}>Price ($)</Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}

export default PriceInput;

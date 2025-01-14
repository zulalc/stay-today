import { Prisma } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const name = Prisma.PropertyScalarFieldEnum.price;

type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor="price">Price ($)</Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        placeholder="Enter the price"
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}

export default PriceInput;

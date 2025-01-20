import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextAreaInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};
function TextAreaInput({ name, label, defaultValue }: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name}>{label || name}</Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || defaultDescription}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  );
}

const defaultDescription =
  "A cozy and comfortable rental property located in a serene neighborhood. This property features modern amenities, spacious rooms, and a beautiful garden. Perfect for families or individuals looking for a peaceful retreat.";

export default TextAreaInput;

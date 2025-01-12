import { Input } from "../ui/input";
import { Label } from "../ui/label";

function ImageInput() {
  const name = "image";
  return (
    <div className="mb-2">
      <Label htmlFor={name}>Image</Label>
      <Input
        type="file"
        id={name}
        name={name}
        className="max-w-xs"
        accept="image/*"
      />
    </div>
  );
}

export default ImageInput;

import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import { createPropertyAction } from "@/utils/actions";

function CreateProperty() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-8">Create Property</h1>
      <div className="border p-8 rounded-md max-w-md w-full">
        <h3 className="text-lg mb-4 font-medium">General Information</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (max 20 characters)"
              defaultValue="Property Name"
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (max 30 characters)"
              defaultValue="Property Tagline"
            />
            <PriceInput />
            <CategoriesInput />
          </div>
          <SubmitButton text="Create Property" className="mt-8 w-full" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProperty;
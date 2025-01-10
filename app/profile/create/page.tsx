import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";

async function CreateProfile() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-8 text-center">New User</h1>
      <div className="border p-8 rounded-md max-w-md w-full">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 mt-4">
            <FormInput
              type="text"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>
          <SubmitButton text="Create Profile" className="mt-8 w-full" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProfile;

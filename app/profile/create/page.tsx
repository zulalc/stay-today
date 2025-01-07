import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";

const createProfileAction = async (formData: FormData) => {
  "use server";

  try {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;

    // Validate the data
    if (!firstName || !lastName || !username) {
      throw new Error("All fields are required");
    }

    console.log({ firstName, lastName, username });
    return { message: "Profile created successfully" };
  } catch (error) {
    console.error("Profile creation error:", error);
    return { message: "Failed to create profile" };
  }
};

function CreateProfile() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-8 text-center">New User</h1>
      <div className="border p-8 rounded-md max-w-lg w-full">
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
            <FormInput
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
          </div>
          <SubmitButton text="Create Profile" className="mt-8 w-full" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProfile;

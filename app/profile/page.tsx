import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import {
  fetchProfile,
  updateProfileAction,
  updateProfileImageAction,
} from "@/utils/actions";

async function Profile() {
  const profile = await fetchProfile();
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-8 text-center">Profile</h1>
      <div className="border p-8 rounded-md max-w-md w-full">
        <div className="flex justify-center mb-4">
          <ImageInputContainer
            image={profile.profileImage}
            name="profileImage"
            action={updateProfileImageAction}
            text="Update Profile Image"
          />
        </div>
        <FormContainer action={updateProfileAction}>
          <FormInput
            type="text"
            name="firstName"
            label="First Name"
            defaultValue={profile.firstName}
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name"
            defaultValue={profile.lastName}
          />
          <SubmitButton text="Update Profile" className="mt-8 w-full" />
        </FormContainer>
      </div>
    </section>
  );
}

export default Profile;

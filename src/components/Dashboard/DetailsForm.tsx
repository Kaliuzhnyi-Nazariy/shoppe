import { useForm, type SubmitHandler } from "react-hook-form";
import DetailsFormInput from "./DetailsFormInput";
import StyledButton from "../StyledButton";

export interface DetailsForm {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const DetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DetailsForm>({
    mode: "all",
  });

  const submitHandle: SubmitHandler<DetailsForm> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="mb-24 text-xs min-[1024px]:w-126 min-[1024px]:mx-auto"
      onSubmit={handleSubmit(submitHandle)}
    >
      <h1 className="hidden min-[1024px]:block text-[32px] font-semibold text-center">
        Account details
      </h1>
      <ul className="flex flex-col gap-12 mt-12">
        <li>
          <DetailsFormInput
            label="First name*"
            name="firstName"
            register={register}
            watch={watch}
            errors={errors}
          />
        </li>
        <li>
          <DetailsFormInput
            label="Last name*"
            name="lastName"
            register={register}
            watch={watch}
            errors={errors}
          />
        </li>
        <li>
          <DetailsFormInput
            label="Display name*"
            name="displayName"
            register={register}
            watch={watch}
            errors={errors}
          />
          <p className="text-[12px] text-(--dark-gray)">
            This will be how your name will be displayed in the account section
            and in reviews.
          </p>
        </li>
        <li>
          <DetailsFormInput
            label="Email address*"
            name="email"
            register={register}
            watch={watch}
            type="email"
            errors={errors}
          />
        </li>
      </ul>
      <p className="text-[16px] mt-12">Password change</p>
      <ul className="flex flex-col gap-12 mt-10.5">
        <li>
          <DetailsFormInput
            label="Current password (leave blank to leave unchanged)"
            name="currentPassword"
            register={register}
            watch={watch}
            type="password"
            errors={errors}
          />
        </li>
        <li>
          <DetailsFormInput
            label="New password (leave blank to leave unchanged)"
            name="newPassword"
            register={register}
            watch={watch}
            type="password"
            errors={errors}
          />
        </li>
        <li>
          <DetailsFormInput
            label="Confirm new password"
            name="confirmNewPassword"
            register={register}
            watch={watch}
            type="password"
            errors={errors}
          />
        </li>
      </ul>
      <StyledButton
        text="SAVE CHANGES"
        extraStyles="mt-10 w-full py-1.5 min-[1024px]:py-4 min-[1024px]:text-[16px]"
      />
    </form>
  );
};

export default DetailsForm;

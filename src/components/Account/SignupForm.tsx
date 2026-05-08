import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { SignupInterface } from "../../../features/auth/interface";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../features/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupValidation } from "../../validation";
import Input from "../Input";
import StyledButton from "../Dashboard/Address/StyledButton";
import { useAppDispatch } from "../../app/hooks";
import { tokenSetting } from "../../../features/user/slice";
import { getUser } from "../../../features/user/operations";
import { useLocation, useNavigate } from "react-router";
import { successToast } from "../toast";

const SignupForm = () => {
  const defaultValues: SignupInterface = {
    confirmPassword: "",
    password: "",
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<SignupInterface>({
  //   mode: "all",
  //   resolver: zodResolver(userSignupValidation),
  // });

  const methods = useForm<SignupInterface>({
    mode: "all",
    resolver: zodResolver(userSignupValidation),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupInterface) => signup(data),
    onSuccess(data) {
      methods.reset(defaultValues);
      dispatch(tokenSetting(data));
      dispatch(getUser());
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      navigate(location?.state.from || "/account/dashboard");
      successToast("Welcome!");
    },
    onError(err: { response: { data: { message: string } } }) {
      setErrorMessage(err.response.data.message);
    },
  });

  const submit: SubmitHandler<SignupInterface> = (data) => {
    mutate(data);
  };

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  const changePasswordType = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");

  const changeConfirmPasswordType = () => {
    if (confirmPasswordType == "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const formInputs = [
    { name: "firstName", label: "First name" },
    { name: "lastName", label: "Last name" },
    { name: "displayName", label: "Display name" },
    { name: "email", type: "email", label: "Email" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        className="mt-18 flex flex-col gap-6 text-xs lg:text-[16px]"
        onSubmit={methods.handleSubmit(submit)}
      >
        {formInputs.map((fi) => {
          return (
            <Input
              key={fi.name}
              name={fi.name}
              label={fi.label}
              type={fi.type}
              disabled={isPending}
            />
          );
        })}
        <div className="group relative">
          <Input<SignupInterface>
            label="Password"
            name="password"
            type={passwordType}
            disabled={isPending}
          />

          <button
            type="button"
            className="hidden group-focus-within:block absolute top-0 right-0"
            onClick={() => changePasswordType()}
            disabled={isPending}
          >
            {passwordType === "text" ? <Eye /> : <EyeClosed />}
          </button>
        </div>

        <div className="group relative">
          <Input<SignupInterface>
            label="Confirm password"
            name="confirmPassword"
            type={confirmPasswordType}
            disabled={isPending}
          />

          <button
            type="button"
            className="hidden group-focus-within:block absolute top-0 right-0"
            onClick={() => changeConfirmPasswordType()}
            disabled={isPending}
          >
            {confirmPasswordType === "text" ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        {/* <div className="">
          <input
            type="firstName"
            placeholder="First name"
            {...register("firstName")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full"
          />
          {errors.firstName && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="">
          <input
            type="lastName"
            placeholder="Last name"
            {...register("lastName")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full"
          />
          {errors.lastName && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="">
          <input
            type="displayName"
            placeholder="Display name"
            {...register("displayName")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full"
          />
          {errors.displayName && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div className="">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full"
          />
          {errors.email && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.email.message}
            </p>
          )}
        </div>


        <button
          className={
            "uppercase mt-5.5 w-full py-1.5 bg-black text-white rounded-sm disabled:opacity-50"
          }
          disabled={isPending}
        >
          {isPending ? "Loading..." : "sign up"}
        </button>

        */}
        <StyledButton
          text="SIGN UP"
          isValid={methods.formState.isValid}
          pending={isPending}
          extraStyles="w-full py-1.5 lg:py-4"
        />
        {errorMessage && <p className="text-(--error) mt-4">{errorMessage}</p>}
      </form>
    </FormProvider>
  );
};

export default SignupForm;

import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignupInterface } from "../../../features/auth/interface";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../features/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignupValidation } from "./authValidation";
import { useAppDispatch } from "../../app/hooks";
import { tokenSetting } from "../../../features/user/slice";
import { getUser } from "../../../features/user/operations";
import { useLocation, useNavigate } from "react-router";

const SignupForm = () => {
  const defaultValues: SignupInterface = {
    confirmPassword: "",
    password: "",
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupInterface>({
    defaultValues,
    mode: "all",
    resolver: zodResolver(userSignupValidation),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupInterface) => signup(data),
    onSuccess(data) {
      reset(defaultValues);
      dispatch(tokenSetting(data));
      dispatch(getUser());
      navigate(location?.state.from || "/account/dashboard");
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

  return (
    <>
      <form
        className="mt-18 flex flex-col gap-6"
        onSubmit={handleSubmit(submit)}
      >
        <div className="">
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

        <div className="group relative">
          <input
            type={passwordType}
            placeholder="Password"
            {...register("password")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full relative"
            disabled={isPending}
          />
          {errors.password && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.password.message}
            </p>
          )}

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
          <input
            type={confirmPasswordType}
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className="border-b border-b-(--light-gray) placeholder:text-(--dark-gray) outline-none pb-1.25 w-full relative"
            disabled={isPending}
          />
          {errors.confirmPassword && (
            <p className="text-(--error) text-[8px] mt-2">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="button"
            className="hidden group-focus-within:block absolute top-0 right-0"
            onClick={() => changeConfirmPasswordType()}
            disabled={isPending}
          >
            {confirmPasswordType === "text" ? <Eye /> : <EyeClosed />}
          </button>
        </div>

        <button
          className={
            "uppercase mt-5.5 w-full py-1.5 bg-black text-white rounded-sm disabled:opacity-50"
          }
          disabled={isPending}
        >
          {isPending ? "Loading..." : "sign up"}
        </button>

        {errorMessage && <p className="text-(--error)">{errorMessage}</p>}
      </form>
    </>
  );
};

export default SignupForm;

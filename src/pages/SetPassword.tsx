import { useLocation, useNavigate } from "react-router";
import StyledButton from "../components/StyledButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import Section from "../components/Section";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword, setPassword } from "../../features/auth/request";
import type { ISetPassword } from "../../features/auth/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordValidation } from "../validation";
import { errorToast, successToast } from "../components/toast";

const SetPassword = () => {
  const { search } = useLocation();
  const tokenId = search.split("=")[1];
  const token = localStorage.getItem("resetToken");

  interface IPasswordSet {
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IPasswordSet>({
    mode: "all",
    resolver: zodResolver(passwordValidation),
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const navigate = useNavigate();

  const { mutate: setPasswordFn, isPending: isSettingPassword } = useMutation({
    mutationFn: (data: ISetPassword) => setPassword(data),
    onSuccess() {
      navigate("/account/dashboard");
      successToast("Password is set!");
      localStorage.removeItem("resetToken");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: resetPasswordFn, isPending: isResetingPassword } =
    useMutation({
      mutationFn: (data: ISetPassword) => resetPassword(data),
      onSuccess() {
        localStorage.removeItem("resetToken");
        navigate("/");
        successToast("Password reset successfully!");
      },
      onError(err) {
        const error = err as {
          response?: { data?: { message: string } };
        };
        errorToast(error.response?.data?.message || "Something went wrong!");
      },
    });

  const submitHandle: SubmitHandler<IPasswordSet> = (data) => {
    if (tokenId) {
      setPasswordFn({ ...data, token: tokenId });
    }
    if (token) {
      resetPasswordFn({ ...data, token: token });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  return (
    <Section>
      <form
        onSubmit={handleSubmit(submitHandle)}
        className="mt-10 flex flex-col gap-8"
      >
        <div
          className={`relative group text-(--dark-gray) transition-colors duration-200 focus-within:text-black`}
        >
          <label
            htmlFor={"password"}
            className={`absolute transition-all group-focus-within:-translate-y-full duration-150 ${
              passwordValue?.trim().length > 0
                ? "-translate-y-full"
                : "translate-y-1.5"
            }`}
          >
            Password
          </label>

          <div className="relative w-full">
            <input
              {...register("password")}
              className="w-full border-b border-(--dark-gray) relative outline-none py-1.5"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-0 top-0 -transition-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-(--error) mt-2">
              {errors.password.message}
            </p>
          )}
        </div>{" "}
        <div className="relative group text-(--dark-gray) transition-colors duration-200 focus-within:text-black">
          <label
            htmlFor="confirmPassword"
            className={`absolute transition-all group-focus-within:-translate-y-full duration-150 ${
              confirmPasswordValue?.trim().length > 0
                ? "-translate-y-full"
                : "translate-y-1.5"
            }`}
          >
            Confirm password
          </label>

          <div className="relative w-full">
            <input
              {...register("confirmPassword")}
              className="w-full border-b border-(--dark-gray) relative outline-none py-1.5"
              type={showConfirmationPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-0 top-0 -transition-y-1/2"
              onClick={() => setShowConfirmationPassword((prev) => !prev)}
            >
              {showConfirmationPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-xs text-(--error) mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>{" "}
        <StyledButton
          text="set password"
          isValid={isValid}
          pending={isSettingPassword || isResetingPassword}
        />
      </form>
    </Section>
  );
};

export default SetPassword;

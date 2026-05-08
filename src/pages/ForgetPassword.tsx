import { useForm, type SubmitHandler } from "react-hook-form";
import Section from "../components/Section";
import StyledButton from "../components/StyledButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailValidation } from "../validation";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../../features/auth/request";
import { errorToast, successToast } from "../components/toast";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    mode: "all",
    resolver: zodResolver(emailValidation),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { email: string }) => forgetPassword(data),
    onSuccess(sucData) {
      localStorage.setItem("resetToken", sucData);
      reset({
        email: "",
      });
      //add message that link is sent to mail
      successToast("Token is sent to email!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const submitHandle: SubmitHandler<{ email: string }> = (submitData) => {
    mutate(submitData);
  };

  const value = watch("email");

  return (
    <Section extraStyles="text-xs max-w-140 w-full flex-1 flex flex-col items-center justify-center mx-auto lg:text-lg">
      <h3 className="mx-auto text-center text-xl lg:hidden">Lost password</h3>
      <h3 className="mx-auto text-center text-xl hidden lg:block text-[31.5px] font-semibold">
        Have you Forgotten Your Password ?
      </h3>
      <p className="mt-4 lg:w-125 lg:text-center">
        If you've forgotten your password, enter your e-mail address and we'll
        send you an e-mail{" "}
      </p>

      <form onSubmit={handleSubmit(submitHandle)} className="w-full lg:w-125">
        <div className="relative group transition-colors duration-200 focus-within:text-black mt-16">
          <label
            htmlFor={"email"}
            className={`absolute transition-all group-focus-within:-translate-y-full duration-150 ${
              value?.trim().length > 0 ? "-translate-y-full" : "translate-y-1.5"
            }`}
          >
            Email
          </label>

          <input
            {...register("email")}
            className="w-full border-b border-(--gray) relative outline-none py-1.5"
          />

          {errors.email && (
            <p className="text-xs text-(--error) mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <StyledButton
          text="RESET PASSWORD"
          extraStyles="w-full py-1.5 lg:py-4 mt-10"
          isValid={isValid}
          pending={isPending}
        />
      </form>
    </Section>
  );
};

export default ForgetPassword;

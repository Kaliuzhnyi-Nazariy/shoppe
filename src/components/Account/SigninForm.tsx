import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../../features/auth/request";
import { type SigninInterface } from "../../../features/auth/interface";
import { signInValidation } from "./authValidation";
import { useAppDispatch } from "../../app/hooks";
import { getUser } from "../../../features/user/operations";

const SigninForm = () => {
  const defaultValues: SigninInterface = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninInterface>({
    defaultValues,
    mode: "all",
    resolver: zodResolver(signInValidation),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (data: SigninInterface) => signin(data),
    onSuccess(data) {
      console.log(data);
      reset(defaultValues);
      dispatch(getUser());
      navigate(location?.state.from || "/account/dashboard");
    },
    onError(err: { response: { data: { message: string } } }) {
      setErrorMessage(err.response.data.message);
    },
  });

  const submit: SubmitHandler<SigninInterface> = (data) => {
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

  return (
    <>
      <form className="mt-22" onSubmit={handleSubmit(submit)}>
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

        <div className="group mt-12 relative">
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

        <button
          className={
            "uppercase mt-5.5 w-full py-1.5 bg-black text-white rounded-sm disabled:opacity-50"
          }
          disabled={isPending}
        >
          {isPending ? "Loading..." : "sign in"}
        </button>

        {errorMessage && <p className="text-(--error)">{errorMessage}</p>}
      </form>

      <Link to="/" className="mt-4 flex justify-center">
        Have you forgotten your password?
      </Link>
    </>
  );
};

export default SigninForm;

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../../features/auth/request";
import { type SigninInterface } from "../../../features/auth/interface";
import { signInValidation } from "../../validation";
import { useAppDispatch } from "../../app/hooks";
import { getUser } from "../../../features/user/operations";
import { tokenSetting } from "../../../features/user/slice";
import Input from "../Input";
import StyledButton from "../Dashboard/Address/StyledButton";
import { successToast } from "../toast";

const SigninForm = () => {
  const defaultValues: SigninInterface = {
    email: "",
    password: "",
  };

  const methods = useForm<SigninInterface>({
    defaultValues,
    mode: "all",
    resolver: zodResolver(signInValidation),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: (data: SigninInterface) => signin(data),
    onSuccess(data) {
      methods.reset(defaultValues);
      dispatch(tokenSetting(data));
      dispatch(getUser());
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      navigate(location?.state?.from || "/account/dashboard");
      successToast("Welcome!");
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

  // const emailValue = watch("email");
  // const passwordValue = watch("password");

  return (
    <FormProvider {...methods}>
      <form className="mt-22 " onSubmit={methods.handleSubmit(submit)}>
        <Input<SigninInterface>
          label="Email"
          name="email"
          disabled={isPending}
          type="email"
        />

        <div className="group mt-11.5 relative  ">
          <Input<SigninInterface>
            label="Password"
            name="password"
            disabled={isPending}
            type={passwordType}
          />

          <button
            type="button"
            className="hidden group-focus-within:block absolute top-0 right-0"
            onClick={() => changePasswordType()}
            disabled={isPending}
          >
            {passwordType === "text" ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </button>
        </div>

        <StyledButton
          text="SIGN IN"
          extraStyles="w-full py-1.5 mt-10 lg:py-4"
          isValid={methods.formState.isValid}
          pending={isPending}
        />

        {errorMessage && <p className="text-(--error) mt-2">{errorMessage}</p>}
      </form>

      <Link to="/forget" className="mt-4 lg:mt-3 flex justify-center">
        Have you forgotten your password?
      </Link>
    </FormProvider>
  );
};

export default SigninForm;

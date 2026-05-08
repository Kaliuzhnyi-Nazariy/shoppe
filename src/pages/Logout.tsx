import { useNavigate } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { useMutation } from "@tanstack/react-query";
import { signout } from "../../features/auth/request";
import { logout } from "../../features/user/slice";
import Section from "../components/Section";
import StyledButton from "../components/StyledButton";
import { errorToast, successToast } from "../components/toast";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: signout,
    onSuccess() {
      dispatch(logout());

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);

      successToast("You are logged out!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });
  return (
    <Section changePaddings="min-[1024px]:px-24">
      <p>To logout from your account click on button below!</p>
      <StyledButton
        text="LOG OUT"
        fn={mutate}
        pending={isPending}
        extraStyles="mt-8 px-4 py-1.5"
      />
    </Section>
  );
};

export default Logout;

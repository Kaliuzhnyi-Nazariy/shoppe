import { useMutation } from "@tanstack/react-query";
import StyledButton from "../../components/StyledButton";
import { passwordRequest } from "../../../features/auth/request";
import { errorToast, successToast } from "../../components/toast";

const SetPasswordBlock = () => {
  const { mutate } = useMutation({
    mutationFn: passwordRequest,
    onSuccess() {
      successToast("Request is made!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  return (
    <div className="flex flex-col gap-6 items-center justify-center text-xs ">
      <p>To set your personal data, please set password!</p>
      <StyledButton text="SET PASSWORD" fn={mutate} />
    </div>
  );
};

export default SetPasswordBlock;

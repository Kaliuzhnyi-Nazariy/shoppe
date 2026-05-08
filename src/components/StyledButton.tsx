interface ButtonProp {
  text: string;
  loadingText?: string;
  isValid?: boolean;
  pending?: boolean;
  type?: "primary" | "secondary";
  btnType?: "submit" | "button";
  fn?: () => void;
  extraStyles?: string;
  form?: string;
}

const StyledButton = ({
  text,
  loadingText = "loading...",
  isValid = true,
  pending = false,
  type = "primary",
  btnType = "submit",
  fn,
  extraStyles,
  form,
}: ButtonProp) => {
  return (
    <button
      type={btnType}
      // className={`${
      //   extraStyles ? extraStyles : "w-full py-2"
      // } rounded-sm border transition-colors duration-200 cursor-pointer disabled:opacity-50 ${
      //   type === "primary"
      //     ? "bg-black text-white  border-transparent focus:bg-white focus:text-black focus:border-black hover:bg-white hover:text-black hover:border-black"
      //     : "border-black text-black bg-white hover:border-transparent hover:bg-black hover:text-white focus:border-transparent focus:bg-black focus:text-white"
      // }  `}
      className={`${
        extraStyles ? extraStyles : "w-full py-2"
      } rounded-sm border transition-colors duration-200 cursor-pointer disabled:opacity-50 ${
        type === "primary"
          ? "bg-black text-white  border-transparent not-disabled:focus:bg-white not-disabled:focus:text-black not-disabled:focus:border-black not-disabled:hover:bg-white not-disabled:hover:text-black not-disabled:hover:border-black"
          : "border-black text-black bg-white not-disabled:hover:border-transparent not-disabled:hover:bg-black not-disabled:hover:text-white not-disabled:focus:border-transparent not-disabled:focus:bg-black not-disabled:focus:text-white"
      }  `}
      disabled={pending || !isValid}
      onClick={fn}
      form={form}
    >
      {pending ? `${loadingText}` : `${text}`}
    </button>
  );
};

export default StyledButton;

import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import type { DetailsForm } from "./DetailsForm";

const DetailsFormInput = ({
  name,
  label,
  register,
  watch,
  type = "text",
  errors,
}: {
  name: keyof DetailsForm;
  label: string;
  register: UseFormRegister<DetailsForm>;
  watch: UseFormWatch<DetailsForm>;
  type?: "text" | "password" | "email";
  errors: FieldErrors<DetailsForm>;
}) => {
  const value = watch(name);
  const error = errors[name];

  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`absolute -translate-y-1/2 group-focus-within:-top-2 transition-all ${
          value && value?.trim()?.length > 0 ? "-top-2" : "top-1/2"
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className="outline-none w-full border-b border-b-(--gray) text-(--dark-gray) py-1.5 "
      />

      {error && (
        <p className="text-[8px] text-(--error)">{error.message as string}</p>
      )}
    </div>
  );
};

export default DetailsFormInput;

import {
  get,
  useFormContext,
  type FieldError,
  // type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  label: string;
  disabled?: boolean;
};

function Input<T extends FieldValues>({
  name,
  type = "text",
  label,
  disabled = false,
}: Props<T>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const value = watch(name);

  const error = get(errors, name) as FieldError | undefined;

  const isFilled =
    type === "number"
      ? value !== undefined && value !== null && !Number.isNaN(value)
      : typeof value === "string" && value.trim().length > 0;

  return (
    <div className="group text-(--dark-gray) focus-within:text-black text-xs lg:text-[16px]">
      <label
        htmlFor={name}
        className={`absolute duration-150 group-focus-within:-translate-y-full ${
          isFilled ? "-translate-y-full" : "translate-y-1.5"
        }`}
      >
        {label}
      </label>
      <input
        id={name}
        {...register(name, {
          setValueAs: (value) => {
            if (type === "number") {
              return value === "" ? undefined : Number(value);
            }
            return value;
          },
        })}
        type={type}
        className="border-b border-b-(--light-gray)  outline-none py-1.5 w-full"
        disabled={disabled}
      />

      {error && <p className="text-xs text-(--error) mt-2">{error.message}</p>}
    </div>
  );
}

export default Input;

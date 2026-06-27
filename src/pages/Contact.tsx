import {
  FormProvider,
  useForm,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import Input from "../components/Input";
import Section from "../components/Section";
import StyledButton from "../components/StyledButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactValidation } from "../validation/contact";
import { successToast } from "../components/toast";

interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
}

const Contact = () => {
  const methods = useForm<IContact>({
    mode: "all",
    resolver: zodResolver(contactValidation),
  });

  const inputs: { label: string; name: Path<IContact>; type?: string }[] = [
    { label: "First name", name: "firstName" },
    { label: "Last name", name: "lastName" },
    { label: "Email", name: "email", type: "email" },
    { label: "Subject", name: "subject" },
  ];

  const value = methods.watch("message");

  const isFilled = value && value.trim().length > 0;

  const submitHandle: SubmitHandler<IContact> = () => {
    methods.reset({
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      subject: "",
    });
    successToast("Message has been sent!");
  };

  return (
    <Section extraStyles="mt-6 mb-24 lg:w-227 lg:mx-auto">
      <h3 className="text-xl lg:text-center lg:text-[32px] lg:font-semibold">
        Contact
      </h3>
      <p className="hidden lg:block mt-10 w-140 text-xl mx-auto text-center">
        Say Hello send us your thoughts about our products or share your ideas
        with our Team!
      </p>

      <FormProvider {...methods}>
        <form
          className="mt-15.5 w-full flex flex-col lg:items-center lg:mt-25 "
          onSubmit={methods.handleSubmit(submitHandle)}
        >
          <div className="w-full flex flex-col gap-12 lg:gap-30 ">
            <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-28 lg:gap-y-24">
              {inputs.map((i) => {
                return (
                  <Input<IContact>
                    label={i.label}
                    name={i.name}
                    key={i.label}
                  />
                );
              })}
            </div>
            <div className="group text-(--dark-gray) focus-within:text-black text-xs lg:text-[16px]">
              <label
                htmlFor="message"
                className={`absolute duration-150 group-focus-within:-translate-y-full ${
                  isFilled ? "-translate-y-full" : "translate-y-1.5"
                }`}
              >
                Message
              </label>
              <textarea
                className="border-b border-b-(--light-gray)  outline-none py-1.5 w-full h-21.25 resize-none"
                {...methods.register("message")}
              />

              {methods.formState.errors.message && (
                <p className="text-xs text-(--error) mt-2">
                  {methods.formState.errors.message.message}
                </p>
              )}
            </div>
          </div>
          <StyledButton
            text="SEND"
            topMargin="mt-6 lg:mt-24"
            extraStyles="w-full py-1.5 lg:w-125 "
            isValid={methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </Section>
  );
};

export default Contact;

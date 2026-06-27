import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  userEmail,
  userFirstName,
  userLastName,
} from "../../../../../features/user/selectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  IAddress,
  IPostAddress,
} from "../../../../../features/address/interface";
import {
  addAddress,
  updateAddress,
} from "../../../../../features/address/request";
import { useEffect } from "react";
import StyledButton from "../../../StyledButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressValidation } from "../../../../validation";
import type z from "zod";
import Input from "../../../Input";
import { errorToast, successToast } from "../../../toast";

const Form = ({
  isOpen,
  data,
  type = "add",
  closeUpdateForm,
  extraStyles,
}: {
  isOpen: boolean;
  data?: IAddress;
  type?: "add" | "update";
  closeUpdateForm?: () => void;
  extraStyles?: string;
}) => {
  const firstNameValue = useSelector(userFirstName);
  const lastNameValue = useSelector(userLastName);
  const emailValue = useSelector(userEmail);

  const defaultValue: IPostAddress = {
    firstName: firstNameValue || "",
    lastName: lastNameValue || "",
    companyName: "",
    country: "",
    city: "",
    streetAddress: "",
    postcode: "",
    email: emailValue || "",
    phone: "",
  };

  const methods = useForm({
    mode: "all",
    defaultValues: defaultValue,
    resolver: zodResolver(addressValidation),
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        companyName: data.companyName || "",
        country: data.country || "",
        city: data.city || "",
        streetAddress: data.streetAddress || "",
        postcode: data.postcode || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, []);

  const client = useQueryClient();

  const { mutate: addAddressFn, isPending: addAddressPending } = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: (data: IPostAddress) => addAddress(data),
    onSuccess() {
      client.invalidateQueries({ queryKey: ["getAddresses"] });
      if (closeUpdateForm) {
        closeUpdateForm();
      }
      successToast("Address is added!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: updateAddressFn, isPending: updateddressPending } =
    useMutation({
      mutationKey: ["updateAddress"],
      mutationFn: (updateData: IPostAddress) =>
        updateAddress({ data: updateData, addressId: data!.id }),
      onSuccess() {
        if (closeUpdateForm) {
          closeUpdateForm();
        }
        client.invalidateQueries({ queryKey: ["getAddresses"] });
        successToast("Address is updated!");
      },
      onError(err) {
        const error = err as { response?: { data?: { message: string } } };
        errorToast(error.response?.data?.message || "Something went wrong!");
      },
    });

  const submitHandle: SubmitHandler<IPostAddress> = (data) => {
    if (type === "add") {
      addAddressFn(data);
    } else {
      updateAddressFn(data);
    }
  };

  const inputFields = [
    {
      id: "firstName" as keyof z.infer<typeof addressValidation>,
      label: "First name *",
    },
    {
      id: "lastName" as keyof z.infer<typeof addressValidation>,
      label: "Last name *",
    },
    {
      id: "companyName" as keyof z.infer<typeof addressValidation>,
      label: "Company name",
    },
    {
      id: "country" as keyof z.infer<typeof addressValidation>,
      label: "Country *",
    },
    {
      id: "streetAddress" as keyof z.infer<typeof addressValidation>,
      label: "Street Address *",
    },
    {
      id: "postcode" as keyof z.infer<typeof addressValidation>,
      label: "Postcode/ZIP*",
    },
    {
      id: "city" as keyof z.infer<typeof addressValidation>,
      label: "Town/City*",
    },
    {
      id: "phone" as keyof z.infer<typeof addressValidation>,
      label: "Phone*",
    },
    {
      id: "email" as keyof z.infer<typeof addressValidation>,
      label: "Email*",
    },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandle)}
        className={`flex flex-col gap-6 mt-6 text-[12px] text-(--dark-gray) transition-all transform origin-top ${
          isOpen ? "scale-y-100 h-fit opacity-100 " : "scale-y-0 h-0 opacity-0"
        } ${extraStyles ? extraStyles : ""}`}
      >
        {inputFields.map((i) => {
          return <Input<IPostAddress> key={i.id} name={i.id} label={i.label} />;
        })}
        {type === "add" && (
          <StyledButton
            text="Add address"
            loadingText="Adding..."
            isValid={methods.formState.isValid}
            pending={addAddressPending}
          />
        )}
        {type === "update" && (
          <>
            <StyledButton
              text="Update Address"
              loadingText="Updating..."
              isValid={methods.formState.isValid}
              pending={updateddressPending}
            />

            <StyledButton
              text="Cancel"
              type="secondary"
              btnType="button"
              fn={closeUpdateForm}
            />
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default Form;

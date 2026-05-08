// import { useFormContext } from "react-hook-form";
// import Input from "../Dashboard/Address/Form/Input";

import Input from "../Input";

const Form = ({ prefix }: { prefix: "billing" | "shipping" }) => {
  // const {
  //   register,
  //   formState: { errors },
  //   watch,
  // } = useFormContext();

  // const values = watch(prefix);

  const inputFields = [
    {
      name: `${prefix}.firstName`,
      label: "First name *",
      // value: values?.firstName || "",
      // error: errors?.[prefix]?.firstName,
    },
    {
      name: `${prefix}.lastName`,
      label: "Last name *",
      // value: values?.lastName || "",
      // error: errors?.[prefix]?.lastName,
    },
    {
      name: `${prefix}.companyName`,
      label: "Company name",
      // value: values?.companyName || "",
      // error: errors?.[prefix]?.companyName,
    },
    {
      name: `${prefix}.country`,
      label: "Country *",
      // value: values?.country || "",
      // error: errors?.[prefix]?.country,
    },
    {
      name: `${prefix}.streetAddress`,
      label: "Street Address *",
      // value: values?.streetAddress || "",
      // error: errors?.[prefix]?.streetAddress,
    },
    {
      name: `${prefix}.postcode`,
      label: "Postcode/ZIP*",
      // value: values?.postcode || "",
      // error: errors?.[prefix]?.postcode,
    },
    {
      name: `${prefix}.city`,
      label: "Town/City*",
      // value: values?.city || "",
      // error: errors?.[prefix]?.city,
    },
    {
      name: `${prefix}.phone`,
      label: "Phone*",
      // value: values?.phone || "",
      // error: errors?.[prefix]?.phone,
    },
    {
      name: `${prefix}.email`,
      label: "email*",
      // value: values?.email || "",
      // error: errors?.[prefix]?.email,
    },
  ];

  // useEffect(() => {
  //   setIsValid(isValid);
  // }, [isValid]);

  return (
    <>
      {inputFields.map((i) => {
        return (
          <Input
            key={i.name}
            // register={register}
            label={i.label}
            name={i.name}
            // value={i.value}
            // error={errors}
          />
        );
      })}
    </>
  );
};

export default Form;

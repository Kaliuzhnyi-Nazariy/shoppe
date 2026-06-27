import Input from "../Input";

const Form = ({ prefix }: { prefix: "billing" | "shipping" }) => {
  const inputFields = [
    {
      name: `${prefix}.firstName`,
      label: "First name *",
    },
    {
      name: `${prefix}.lastName`,
      label: "Last name *",
    },
    {
      name: `${prefix}.companyName`,
      label: "Company name",
    },
    {
      name: `${prefix}.country`,
      label: "Country *",
    },
    {
      name: `${prefix}.streetAddress`,
      label: "Street Address *",
    },
    {
      name: `${prefix}.postcode`,
      label: "Postcode/ZIP*",
    },
    {
      name: `${prefix}.city`,
      label: "Town/City*",
    },
    {
      name: `${prefix}.phone`,
      label: "Phone*",
    },
    {
      name: `${prefix}.email`,
      label: "Email*",
    },
  ];

  return (
    <>
      {inputFields.map((i) => {
        return <Input key={i.name} label={i.label} name={i.name} />;
      })}
    </>
  );
};

export default Form;

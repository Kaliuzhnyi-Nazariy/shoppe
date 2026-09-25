import { useState } from "react";
import Section from "../components/Section";
import SelectOrder from "../components/ShippingAndReturns/SelectOrder";
import StyledButton from "../components/StyledButton";

const ShippingAndReturns = () => {
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");

  const handleSubmit = () => {
    console.log({ selectedOrder, userMessage });
  };

  return (
    <Section changePaddings="py-5 md:py-10 lg:py-20 ">
      <h3 className="text-xl font-semibold lg:text-[33px]">
        Shipping and returns
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-10 lg:w-160 lg:mx-auto"
      >
        <SelectOrder
          selectedOrder={selectedOrder}
          setOrderId={setSelectedOrder}
        />

        <textarea
          className="border rounded-xl mt-4 text-xs w-full resize-none p-2 focus-within:outline-none lg:p-4 lg:text-[14px]"
          rows={8}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Write a message..."
        />

        <StyledButton
          text="SUBMIT"
          isValid={!!selectedOrder}
          topMargin="mt-2"
        />
      </form>
    </Section>
  );
};

export default ShippingAndReturns;

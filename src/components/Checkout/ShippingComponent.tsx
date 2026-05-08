import React from "react";
import type { IAddress } from "../../../features/address/interface";
import AddressSlider from "./AddressSlider";
import Form from "./Form";

type Prop = {
  isUserLoggedIn: boolean;
  handleShippingClick: (data: { address: IAddress; idx: number }) => void;
  selectedShippingAddress: number | null;
  addNewShippingAddress: boolean;
  setSaveNewAddressShipping: React.Dispatch<React.SetStateAction<boolean>>;
  anotherShippingAddress: boolean;
  checkboxHandle: () => void;
};

const ShippingComponent = ({
  isUserLoggedIn,
  handleShippingClick,
  selectedShippingAddress,
  addNewShippingAddress,
  setSaveNewAddressShipping,
  anotherShippingAddress,
  checkboxHandle,
}: Prop) => {
  return (
    <>
      {isUserLoggedIn && anotherShippingAddress && (
        <>
          {isUserLoggedIn && (
            <AddressSlider
              clickHandle={(data: { address: IAddress; idx: number }) =>
                handleShippingClick(data)
              }
              chosenAddress={selectedShippingAddress}
            />
          )}

          <label
            htmlFor="addNewShippingAddress"
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              name=""
              id="addNewShippingAddress"
              onChange={checkboxHandle}
              checked={addNewShippingAddress}
            />
            <p>Add new shipping address?</p>
          </label>

          {addNewShippingAddress && (
            <>
              <Form prefix="shipping" />
              <label
                htmlFor="saveAddressShipping"
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name=""
                  id="saveAddressShipping"
                  onClick={() => setSaveNewAddressShipping((prev) => !prev)}
                  disabled={selectedShippingAddress !== null}
                />
                <p>Save that address?</p>
              </label>
            </>
          )}
        </>
      )}
      {!isUserLoggedIn && anotherShippingAddress && <Form prefix="billing" />}
    </>
  );
};

export default ShippingComponent;

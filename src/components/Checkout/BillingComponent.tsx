import React from "react";
import type { IAddress } from "../../../features/address/interface";
import AddressSlider from "./AddressSlider";
import Form from "./Form";

type Prop = {
  isUserLoggedIn: boolean;
  handleBillingClick: (data: { address: IAddress; idx: number }) => void;
  selectedBillingAddress: number | null;
  addNewAddress: boolean;
  checkboxHandle: () => void;
  setSaveNewAddressBilling: React.Dispatch<React.SetStateAction<boolean>>;
};

const BillingComponent = ({
  isUserLoggedIn,
  handleBillingClick,
  selectedBillingAddress,
  addNewAddress,
  checkboxHandle,
  setSaveNewAddressBilling,
}: Prop) => {
  return (
    <>
      {isUserLoggedIn && (
        <AddressSlider
          clickHandle={(data: { address: IAddress; idx: number }) =>
            handleBillingClick(data)
          }
          chosenAddress={selectedBillingAddress}
        />
      )}
      {isUserLoggedIn && (
        <label
          htmlFor="addNewAddressLoggedIn"
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            name=""
            id="addNewAddressLoggedIn"
            checked={addNewAddress}
            onChange={checkboxHandle}
          />
          Add new address?
        </label>
      )}
      {isUserLoggedIn && addNewAddress && (
        <>
          <Form prefix="billing" />
          <label
            htmlFor="saveAddressBilling"
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              name=""
              id="saveAddressBilling"
              onClick={() => setSaveNewAddressBilling((prev) => !prev)}
            />
            <p>Save that address?</p>
          </label>
        </>
      )}
      {!isUserLoggedIn && <Form prefix="billing" />}
    </>
  );
};

export default BillingComponent;

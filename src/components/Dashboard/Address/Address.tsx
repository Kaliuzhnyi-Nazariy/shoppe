import { useState } from "react";
import Form from "./Form/Form";
import type { IAddress } from "../../../../features/address/interface";
import { AddressItem } from "./AddressItem";
import { OrbitProgress } from "react-loading-indicators";
// import { useQuery } from "@tanstack/react-query";
// import { getAddresses } from "../../../../features/address/request";

const Address = ({
  addresses,
  addressesPending,
}: // name,
{
  addresses: IAddress[];
  addressesPending: boolean;
  // name: string;
}) => {
  const [addForm, setAddForm] = useState(false);

  return (
    <>
      {/* <h5 className="mt-6 text-[16px]">{name} address</h5> */}
      <button
        type="button"
        className="mt-4.5 text-(--accent)"
        onClick={() => setAddForm(!addForm)}
      >
        {addForm ? "CANCEL" : "ADD"}
      </button>

      {addForm ? (
        <Form isOpen={addForm} closeUpdateForm={() => setAddForm(false)} />
      ) : (
        <>
          {addressesPending ? (
            <div className="flex flex-col items-center justify-center">
              <OrbitProgress color="var(--gray)" size="small" />
            </div>
          ) : (
            <>
              {addresses.length === 0 ? (
                <p className="text-(--dark-gray) mt-4">
                  You have not set up this type of address yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-4 mt-4">
                  {addresses.map((a) => {
                    return <AddressItem address={a} key={a.id} />;
                  })}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Address;

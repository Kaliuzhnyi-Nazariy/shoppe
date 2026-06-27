import { useState } from "react";
import type { IAddress } from "../../../../features/address/interface";
import Form from "./Form/Form";
import StyledButton from "../../StyledButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../../../features/address/request";
import { errorToast, successToast } from "../../toast";
import { OrbitProgress } from "react-loading-indicators";

export const AddressItem = ({ address }: { address: IAddress }) => {
  const [updateFrom, setUpdateForm] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAddress(address.id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getAddresses"] });
      successToast("Address is deleted!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  return (
    <>
      {isPending ? (
        <div className="flex flex-col items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <>
          <li className="border border-(--gray) rounded-md p-5">
            {updateFrom ? (
              <Form
                isOpen={updateFrom}
                data={address}
                type="update"
                closeUpdateForm={() => setUpdateForm(false)}
              />
            ) : (
              <>
                <p>
                  <span className="text-(--accent)">Country:</span>{" "}
                  {address.country}
                </p>
                <p>
                  <span className="text-(--accent)">City:</span> {address.city}
                </p>
                <p>
                  <span className="text-(--accent)">Street:</span>{" "}
                  {address.streetAddress}
                </p>
                <p>
                  <span className="text-(--accent)">Postcode:</span>{" "}
                  {address.postcode}
                </p>
                {address.companyName && (
                  <p>Company name: {address.companyName}</p>
                )}
                <p>
                  <span className="text-(--accent)">First name:</span>{" "}
                  {address.firstName}
                </p>
                <p>
                  <span className="text-(--accent)">Last name:</span>{" "}
                  {address.lastName}
                </p>
                <p>
                  <span className="text-(--accent)">Email:</span>{" "}
                  {address.email}
                </p>
                <p>
                  <span className="text-(--accent)">Phone:</span>{" "}
                  {address.phone}
                </p>
              </>
            )}
            {!updateFrom && (
              <div className="mt-4 flex gap-2 ">
                <StyledButton
                  text="Delete"
                  extraStyles="py-1.5 px-2 "
                  fn={() => mutate()}
                  pending={isPending}
                />
                <StyledButton
                  text="Update"
                  fn={() => setUpdateForm(true)}
                  type="secondary"
                  extraStyles="py-1.5 px-2 "
                />
              </div>
            )}
          </li>
        </>
      )}
    </>
  );
};

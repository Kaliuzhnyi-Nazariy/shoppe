import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../features/order/requests";
import Input from "../Input";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSearchValidation } from "../../validation/orderSearch";
import { useState } from "react";
import type { IOrder } from "../../../features/order/interface";

const SelectOrder = ({
  selectedOrder,
  setOrderId,
}: {
  selectedOrder: string;
  setOrderId: (val: string) => void;
}) => {
  const { data, isPending } = useQuery({
    queryKey: ["getOrders"],
    queryFn: () => getOrders("") as Promise<IOrder[]>,
  });

  const [selectButtonClicked, setSelectButtonClicked] = useState(false);

  const methods = useForm<{ orderId: string }>({
    mode: "onChange",
    resolver: zodResolver(orderSearchValidation),
  });

  const submit: SubmitHandler<{ orderId: string }> = (data) => {
    setOrderId(data.orderId);
  };

  return (
    <div className="mt-5">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          {data ? (
            <>
              {data.length === 0 ? (
                <div>
                  <p>Unfortunately you don't have orders</p>
                </div>
              ) : (
                <>
                  {selectedOrder ? (
                    <div className="flex gap-2 items-center justify-center">
                      <p className="grow truncate">{selectedOrder}</p>
                      <button className="shrink" onClick={() => setOrderId("")}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      {" "}
                      <button
                        className="border rounded-xl py-2 text-center w-full"
                        type="button"
                        onClick={() =>
                          setSelectButtonClicked(!selectButtonClicked)
                        }
                      >
                        {!selectButtonClicked ? "Select" : "Close"}
                      </button>
                      {selectButtonClicked && (
                        <ul className="absolute top-full left-0 w-full p-2 border rounded-xl bg-white mt-1 z-10 shadow-lg max-h-60 overflow-y-auto">
                          {data.map((o) => {
                            return (
                              <li
                                className="not-last:border-b text-xs py-2 cursor-pointer hover:bg-gray-50 not-last:border-b-black/50 lg:text-[14px]"
                                key={o.id}
                                onClick={() => {
                                  setOrderId(o.id);
                                  setSelectButtonClicked(false);
                                }}
                              >
                                <p>{o.id}</p>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <FormProvider {...methods}>
              <form
                className="mt-5 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  methods.handleSubmit(submit)(e);
                }}
              >
                <Input
                  key="order"
                  name="order"
                  label="Order ID"
                  type="text"
                  // disabled={isPending}
                />
                <button className="shrink">search</button>
              </form>
            </FormProvider>
          )}
        </>
      )}
    </div>
  );
};

export default SelectOrder;

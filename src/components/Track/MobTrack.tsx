import type { IOrder, IOrderItem } from "../../../features/order/interface";
import StyledButton from "../StyledButton";
import { Copy } from "lucide-react";
import { successToast } from "../toast";
import Loader from "../Loader";

const MobTrack = ({
  order,
  role,
  cancelingOrder,
  updatingOrderStatus,
  updateOrderStatusFn,
  cancelOrderFn,
}: {
  order: IOrder;
  role: "admin" | "customer" | null;
  cancelingOrder: boolean;
  updatingOrderStatus: boolean;
  updateOrderStatusFn: (id: string) => void;
  cancelOrderFn: (id: string) => void;
}) => {
  return (
    <div className="border border-(--gray) p-4 rounded-sm text-xs flex flex-col gap-2 min-[1024px]:hidden">
      <div className="flex gap-2">
        <DataField name="ID" orderData={order.id} />

        <button
          onClick={() => {
            window.navigator.clipboard.writeText(order.id);
            successToast("ID coppied");
          }}
          className="hover:cursor-pointer"
        >
          <Copy size={12} />
        </button>
      </div>
      <DataField
        name="Shipping address"
        orderData={`${order.shippingStreet}, ${order.shippingCity},
              ${order.shippingCountry}, ${order.shippingPostcode}`}
      />
      <DataField
        name="Receiver"
        orderData={`${order.shippingLastName}, ${order.shippingFirstName}`}
      />
      <DataField name="Receiver phone" orderData={`${order.shippingPhone}`} />
      <DataField name="Receiver email" orderData={`${order.shippingEmail}`} />
      <p className="font-bold">Items: </p>
      <ul className="flex flex-col w-full">
        {order.items.map((i: IOrderItem) => {
          return (
            <li key={i.productId} className="flex justify-between w-full">
              <p className="font-semibold">{i.productTitle}</p>
              <p>
                {i.quantity} x ${i.price}
              </p>
            </li>
          );
        })}
      </ul>
      <p>
        <span className="font-bold">Status:</span> {order.status}
      </p>

      {/* {role && role === "admin" ? (
              <ul>
                <li>
                  <StyledButton text="UPDATE STATUS" type="secondary" />
                  </li>
                  <li>
                  <StyledButton text="CANCEL ORDER" />
                  </li>
                  </ul>
                  ) : (
                    <StyledButton text="CANCEL ORDER" />
                    )} */}
      {cancelingOrder || updatingOrderStatus ? (
        <Loader />
      ) : (
        <>
          {role && role === "admin" && (
            <StyledButton
              text="UPDATE STATUS"
              type="secondary"
              isValid={
                order.status !== "canceled" && order.status !== "delivered"
              }
              fn={() => order.id && updateOrderStatusFn(order.id)}
            />
          )}
          <StyledButton
            text="CANCEL ORDER"
            fn={() => order.id && cancelOrderFn(order.id)}
            isValid={
              order.status !== "canceled" && order.status !== "delivered"
            }
          />
        </>
      )}
    </div>
  );
};

export default MobTrack;

const DataField = ({
  name,
  orderData,
}: {
  name: string;
  orderData?: string;
}) => {
  return (
    <p>
      <span className="font-bold">{name}:</span> {orderData && orderData}
    </p>
  );
};

import type { IOrder, IOrderItem } from "../../../features/order/interface";
import StyledButton from "../StyledButton";

const PcTrack = ({
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
  const subtotal = order.items.reduce((acc: number, item: IOrderItem) => {
    return acc + item.price * item.quantity;
    // return (acc += item.price * item.quantity);
  }, 0);

  return (
    <>
      <div className=" gap-x-20 text-[16px] w-full min-[1440px]:gap-x-42  hidden min-[1024px]:flex">
        <div className="w-1/2">
          <h2 className="text-[26px]">Order Details</h2>
          <ul className="grid grid-cols-2 grid-rows-4 gap-x-15 gap-y-10 mt-5 w-full min-[1440px]:gap-x-34 ">
            <li className="flex flex-col gap-1.5">
              <h5 className="uppercase font-semibold">order number</h5>
              <p className="max-w-30 truncate">{order.id}</p>
            </li>
            <li className="flex flex-col gap-1.5 col-start-1 row-start-2">
              <h5 className="uppercase font-semibold">email</h5>
              <p className="max-w-30 truncate">{order.shippingEmail}</p>
            </li>
            <li className="flex flex-col gap-1.5 col-start-1 row-start-3">
              <h5 className="uppercase font-semibold">order date</h5>
              <p className="max-w-30 truncate">{order.shippingEmail}</p>
            </li>
            <li className="flex flex-col gap-1.5 col-start-1 row-start-4">
              {/* <h5 className="uppercase font-semibold">PAYMENT METHOD</h5>
            <p className="max-w-30 truncate">{order.paymentMethod}</p> */}
              <h5 className="uppercase font-semibold">Status</h5>
              <p className="max-w-30 truncate">{order.status}</p>
            </li>
            <li className="flex flex-col gap-1.5 col-start-2 row-start-1">
              <h5 className="uppercase font-semibold">Delivery options</h5>
              <p className="max-w-30 truncate">{order.deliveryOption}</p>
            </li>
            <li className="flex flex-col gap-1.5 col-start-2 row-start-2 row-end-4">
              <h5 className="uppercase font-semibold">Delivery address</h5>
              <div className="max-w-30 truncate">
                <p>{order.shippingStreet}</p>
                <p>{order.shippingPostcode}</p>
                <p>{order.shippingCity}</p>
                <p>{order.shippingCountry}</p>
              </div>
            </li>
            <li className="flex flex-col gap-1.5 col-start-2 row-start-4">
              <h5 className="uppercase font-semibold">contact number</h5>
              <p className="max-w-30 truncate">{order.contactNumber}</p>
            </li>
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-[26px]">Order Summary</h2>
          <div className="mt-10 px-15 py-10 bg-(--light-gray) w-full">
            <span className="flex items-center uppercase justify-between w-full">
              <h5 className="text-[16px] font-semibold">product</h5>
              <h5 className="text-[16px] font-semibold">total</h5>
            </span>
            <div className="h-px bg-(--gray) mt-4"></div>
            <ul className="flex flex-col w-full text-(--dark-gray) mt-5.5 ">
              {order.items.map((item) => {
                return (
                  <li
                    key={item.productId}
                    className="flex items-center justify-between"
                  >
                    <p>{item.productTitle}</p>
                    <p>${item.quantity * item.price}</p>
                  </li>
                );
              })}
            </ul>
            <div className="h-px bg-(--gray) mt-4"></div>
            <span className="flex items-center justify-between mt-3">
              <h5 className="text-[16px] uppercase">subtotal</h5>
              <h5 className="text-[16px] text-(--dark-gray)">${subtotal}</h5>
            </span>
            <div className="h-px bg-(--gray) mt-2.5"></div>
            <span className="flex items-center justify-between mt-3">
              <h5 className="text-[16px] uppercase">Shipping</h5>
              <h5 className="text-[16px] text-(--dark-gray)">
                {order.deliveryOption}
              </h5>
            </span>
            <div className="h-px bg-(--gray) mt-2.5"></div>
            <span className="flex items-center justify-between mt-6 font-bold">
              <h5 className="text-[16px] uppercase">Total</h5>
              <h5 className="text-[16px]">${subtotal}</h5>
            </span>
          </div>
        </div>
      </div>
      <div className="hidden min-[1024px]:block mt-10 w-full">
        {role && role === "admin" && (
          <StyledButton
            text="UPDATE STATUS"
            type="secondary"
            isValid={
              order.status !== "canceled" && order.status !== "delivered"
            }
            pending={cancelingOrder || updatingOrderStatus}
            fn={() => order.id && updateOrderStatusFn(order.id)}
            extraStyles=" w-full py-1.5"
          />
        )}
        <StyledButton
          text="CANCEL ORDER"
          fn={() => order.id && cancelOrderFn(order.id)}
          isValid={order.status !== "canceled" && order.status !== "delivered"}
          pending={cancelingOrder || updatingOrderStatus}
          extraStyles=" w-full py-1.5 mt-6"
        />
      </div>
    </>
  );
};

export default PcTrack;

import type { OrderStatus } from "../../../../features/order/interface";
import OrderItem from "./OrderItem";
import OrderTable from "./OrderTable";

const OrderList = ({
  data,
}: {
  data: {
    id: string;
    createdAt: string;
    status: OrderStatus;
    totalPrice: number;
    buyerId: string;
  }[];
}) => {
  //   console.log(data);

  return (
    <>
      <ul className="flex flex-col gap-10 max-h-[40vh] overflow-y-auto min-[1024px]:hidden ">
        {data.map((order, idx) => {
          return (
            <li key={order.id}>
              <OrderItem key={order.id} data={order} />
              {idx !== data.length - 1 && <div className="h-px bg-(--gray)" />}
            </li>
          );
        })}
      </ul>
      <OrderTable data={data} />
    </>
  );
};

export default OrderList;

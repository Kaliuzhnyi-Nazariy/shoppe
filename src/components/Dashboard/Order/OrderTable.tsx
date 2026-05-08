import { downloadOrder } from "../../../../features/order/requests";
import type { OrderStatus } from "../../../../features/order/interface";
import StyledButton from "../../StyledButton";
import { useNavigate } from "react-router";

const OrderTable = ({
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
  const dayFormatter = (date: string) => {
    const dateFormat = new Date(date);

    const dateDay = dateFormat.getDate();
    const dateMonth = dateFormat.getMonth();
    const dateYear = dateFormat.getFullYear();

    return `${dateDay}-${dateMonth}-${dateYear}`;
  };

  const navigate = useNavigate();

  return (
    <table className="hidden min-[1024px]:table w-full text-xs min-[1440px]:text-[16px] ">
      <thead className="uppercase  py-4 w-full border-b ">
        <tr className="w-full text-left">
          <th className="pb-4">order number</th>
          <th className="pb-4">date</th>
          <th className="pb-4">status</th>
          <th className="pb-4">total</th>
          <th className="pb-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="[&>tr]:not-last:border-b [&>tr]:border-(--gray)">
        {data.map((order) => {
          return (
            <tr key={order.id}>
              <td className="py-6">{order.id}</td>
              <td className="py-6">{dayFormatter(order.createdAt)}</td>
              <td className="py-6">{order.status}</td>
              <td className="py-6">${order.totalPrice}</td>
              <td className="py-6 flex gap-2 justify-center">
                <StyledButton
                  text="TRACK"
                  extraStyles="py-0.5 px-2"
                  btnType="button"
                  fn={() => navigate(`/order/track?order=${order.id}`)}
                />
                |
                <button
                  className="text-(--accent) uppercase"
                  onClick={() => downloadOrder(order.id)}
                  type="button"
                >
                  download
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;

import { useNavigate } from "react-router";
import type { OrderStatus } from "../../../../features/order/interface";
import StyledButton from "../../StyledButton";
import { downloadOrder } from "../../../../features/order/requests";
import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/selectors";

const OrderDataField = ({
  fieldName,
  value,
}: {
  fieldName: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="uppercase">{fieldName}</p>
      <p className="text-(--dark-gray) max-w-45 truncate" title={value}>
        {value}
      </p>
    </div>
  );
};

const dayFormatter = (date: string) => {
  const dateFormat = new Date(date);

  const dateDay = dateFormat.getDate();
  const dateMonth = dateFormat.getMonth();
  const dateYear = dateFormat.getFullYear();

  return `${dateDay}-${dateMonth}-${dateYear}`;
};

const OrderItem = ({
  data,
}: {
  data: {
    id: string;
    createdAt: string;
    status: OrderStatus;
    totalPrice: number;
    buyerId: string;
  };
}) => {
  const navigate = useNavigate();

  const role = useSelector(userRole);

  return (
    <div className="flex flex-col gap-6 text-xs pb-6">
      <OrderDataField fieldName="order id" value={data.id} />
      {role === "admin" && (
        <OrderDataField fieldName="user id" value={data.buyerId} />
      )}
      <OrderDataField fieldName="Date" value={dayFormatter(data.createdAt)} />
      <OrderDataField fieldName="status" value={data.status} />
      <OrderDataField fieldName="total" value={`$ ${data.totalPrice}`} />
      <div className="flex items-center justify-between">
        <p className="uppercase">Track</p>
        <StyledButton
          text="TRACK"
          extraStyles="py-1 px-4"
          btnType="button"
          fn={() => navigate(`/order/track?order=${data.id}`)}
        />
      </div>
      <div className="flex items-center justify-end">
        {/* <Link
          to={`/api/orders/download/${data.id}`}
          target="_blank"
          className="text-(--accent)"
        >
          DOWNLOAD
        </Link> */}

        <button
          onClick={() => downloadOrder(data.id)}
          className="text-(--accent) uppercase"
          type="button"
        >
          download
        </button>
      </div>
    </div>
  );
};

export default OrderItem;

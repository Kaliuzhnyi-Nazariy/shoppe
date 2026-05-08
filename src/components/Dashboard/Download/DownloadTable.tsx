import { useNavigate } from "react-router";
import StyledButton from "../../StyledButton";

const DownloadTable = ({
  data,
}: {
  data: {
    id: string;
    userId: string;
    orderId: string;
    createdAt: Date;
    totalPrice: string;
  }[];
}) => {
  const dayFormatter = (date: Date) => {
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
          <th className="pb-4">order id</th>
          {/* <th className="pb-4">user id</th> */}
          <th className="pb-4">date</th>
          <th className="pb-4">total</th>
          <th className="pb-4">Actions</th>
        </tr>
      </thead>
      <tbody className="[&>tr]:not-last:border-b [&>tr]:border-(--gray)">
        {data.map((download) => {
          return (
            <tr key={download.id}>
              <td className="py-6">{download.orderId}</td>
              {/* <td className="py-6">{download.userId}</td> */}
              <td className="py-6">{dayFormatter(download.createdAt)}</td>
              <td className="py-6">${download.totalPrice}</td>
              <td className="py-6">
                <StyledButton
                  text="TRACK"
                  extraStyles="py-0.5 px-2"
                  btnType="button"
                  fn={() => navigate(`/order/track?order=${download.orderId}`)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DownloadTable;

import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/selectors";

const DownloadInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="font-bold uppercase">{title}: </p>
      <p title={`${value}`} className="max-w-30 truncate">
        {value}
      </p>
    </div>
  );
};

const DownloadItem = ({
  download,
}: {
  download: {
    id: string;
    userId: string;
    orderId: string;
    createdAt: Date;
    totalPrice: string;
  };
}) => {
  const role = useSelector(userRole);

  const dayFormatter = (date: Date) => {
    const dateDay = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    return `${dateDay}-${dateMonth}-${dateYear}`;
  };

  return (
    <div className="flex flex-col gap-4 p-5 text-xs">
      <DownloadInfo title="ID" value={download.id} />
      {role === "admin" && (
        <DownloadInfo title="User ID" value={download.userId} />
      )}
      <DownloadInfo title="Order ID" value={download.id} />
      <DownloadInfo title="TOTAL" value={`$${download.totalPrice}`} />
      <DownloadInfo
        title="Downloaded"
        value={dayFormatter(new Date(download.createdAt))}
      />
    </div>
  );
};

export default DownloadItem;

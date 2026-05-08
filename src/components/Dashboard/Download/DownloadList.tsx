import DownloadItem from "./DownloadItem";
import DownloadTable from "./DownloadTable";

const DownloadList = ({
  downloads,
}: {
  downloads: {
    id: string;
    userId: string;
    orderId: string;
    createdAt: Date;
    totalPrice: string;
  }[];
}) => {
  return (
    <>
      <ul className="flex flex-col gap-4 max-h-[37vh] overflow-y-auto min-[1024px]:hidden">
        {downloads.map((d, idx) => {
          return (
            <li key={d.id}>
              <DownloadItem download={d} />
              {idx !== downloads.length - 1 && (
                <div className="h-px bg-(--gray)" />
              )}{" "}
            </li>
          );
        })}
      </ul>
      <DownloadTable data={downloads} />
    </>
  );
};

export default DownloadList;

import { Link } from "react-router";

const NoInList = ({ link, message }: { link: string; message: string }) => {
  return (
    <div className="border-t-2 border-t-(--accent) bg-(--light-gray) px-4 py-2.5 flex flex-col gap-2 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between min-[1024px]:px-10 min-[1024px]:py-5 text-xs min-[1024px]:text-[16px]">
      <p>{message}</p>
      <Link to={link} className="uppercase text-(--accent)">
        browse product
      </Link>
    </div>
  );
};

export default NoInList;

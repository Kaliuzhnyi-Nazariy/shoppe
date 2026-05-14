import { Link } from "react-router";

interface Props {
  category: string;
  date: string;
  title: string;
  article: string;
  id: string;
}

const Preview = ({ id, category, date, title, article }: Props) => {
  return (
    <li className="lg:max-w-112.5 lg:justify-self-center">
      <div className="w-full h-48 bg-(--accent) rounded-lg lg:h-75"></div>

      <div className="mt-4 lg:mt-5">
        <span className="text-(--dark-gray) lg:text-[14px]">
          {category} - {date}
        </span>
        <h5 className="text-[16px] lg:text-xl lg:mt-1">{title}</h5>
        <article className="w-full line-clamp-2 text-(--dark-gray) mt-1 lg:text-[16px] lg:mt-3">
          {article}
        </article>

        <Link
          to={"/post/" + id}
          className="block mt-4 text-(--accent) cursor-pointer lg:text-[16px] lg:mt-6"
        >
          Read more
        </Link>
      </div>
    </li>
  );
};

export default Preview;

import { Search } from "lucide-react";
import { OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router";
import type { IProduct } from "../../features/products/interface";

const Searchbar = ({
  extraStyles = "",
  value,
  onChange,
  pending,
  result = [],
  clickHandle,
  showSearchResult = true,
}: {
  extraStyles?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pending: boolean;
  result?: IProduct[];
  clickHandle?: () => void;
  showSearchResult?: boolean;
}) => {
  return (
    <>
      <label
        className={`bg-(--light-gray) text-(--dark-gray) flex gap-2 p-1.5 rounded-sm items-center group ${extraStyles} relative z-30 text-xs min-[1024px]:text-[16px] min-[1024px]:px-2 min-[1024px]:py-5 `}
      >
        <Search className="size-3 text-(--dark-gray)" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
          value={value}
          onChange={onChange}
        />
        {showSearchResult && (
          <div className="absolute w-full min-h-0 max-h-24 overflow-y-auto bg-(--light-gray) top-full left-0 hidden group-focus-within:block z-50">
            {value.length > 0 && (
              <>
                {pending ? (
                  <OrbitProgress color="var(--gray)" size="small" />
                ) : (
                  <div className="p-2">
                    {result.length > 0 ? (
                      <ul className="">
                        {result.map((os: IProduct) => {
                          return (
                            <li key={os.id} className="">
                              <Link
                                to={`/product/${os.id}`}
                                className="py-1 hover:bg-(--gray)"
                                onClick={() => clickHandle && clickHandle()}
                              >
                                <p>{os.title}</p>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>Product is not found</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </label>
    </>
  );
};

export default Searchbar;

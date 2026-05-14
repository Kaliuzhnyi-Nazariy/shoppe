import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import StyledButton from "../StyledButton";

const Filters = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearhValue] = useState("");
  const [category, setCategoryValue] = useState<null | string>(null);

  const setSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(params);

    const value = search.trim();

    if (value) {
      searchParams.set("searchBlog", value);
    } else {
      searchParams.delete("searchBlog");
    }

    setParams(searchParams);
  };

  const setCategory = (category: string) => {
    const searchParams = new URLSearchParams();

    setCategoryValue(category);
    searchParams.set("category", category);

    setParams(searchParams);
  };

  const clearFilters = () => {
    const searchParams = new URLSearchParams();

    searchParams.delete("searchBlog");
    searchParams.delete("category");

    setSearhValue("");
    setCategoryValue(null);

    setParams(searchParams);
  };

  return (
    <>
      <div className="hidden lg:flex flex-col gap-16 w-65.5 text-[16px] ">
        <form onSubmit={(e) => setSearch(e)} className="w-full">
          <div className="border-b border-b-(--gray) w-full flex items-center justify-between">
            <input
              type="text"
              onChange={(e) => setSearhValue(e.target.value)}
              // {...methods.register("search")}
              className="outline-none py-3 "
              placeholder="Search..."
              value={search}
            />

            <button>
              <Search className="size-4" />
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-5">
          <h4 className="text-xl font-semibold">Categories</h4>
          <ul className="flex flex-col gap-2 mt-5 text-(--dark-gray)">
            <li
              onClick={() => setCategory("fashion")}
              className={`${
                category === "fashion" ? "text-(--accent)" : ""
              } transition-colors duration-150`}
            >
              Fashion
            </li>
            <li
              onClick={() => setCategory("style")}
              className={`${
                category === "style" ? "text-(--accent)" : ""
              } transition-colors duration-150`}
            >
              Style
            </li>
            <li
              onClick={() => setCategory("accessories")}
              className={`${
                category === "accessories" ? "text-(--accent)" : ""
              } transition-colors duration-150`}
            >
              Accessories
            </li>
            <li
              onClick={() => setCategory("season")}
              className={`${
                category === "season" ? "text-(--accent)" : ""
              } transition-colors duration-150`}
            >
              Season
            </li>
          </ul>
        </div>
        {params.size != 0 && (
          <StyledButton
            text="CLEAR FILTERS"
            btnType="button"
            fn={clearFilters}
          />
        )}
      </div>
    </>
  );
};

export default Filters;

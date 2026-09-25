import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router";
import StyledButton from "../StyledButton";

const categories = ["fashion", "style", "accessories", "season"] as const;

const Filters = () => {
  const [params, setParams] = useSearchParams();

  const searchQuery = params.get("searchBlog") || "";
  const activeCategory = params.get("category");

  const handleSearchChange = (value: string) => {
    const nextParams = new URLSearchParams(params);

    if (value.trim()) {
      nextParams.set("searchBlog", value);
    } else {
      nextParams.delete("searchBlog");
    }

    setParams(nextParams);
  };

  const handleCategoryClick = (category: string) => {
    const nextParams = new URLSearchParams(params);

    if (activeCategory === category) {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setParams(nextParams);
  };

  const clearFilters = () => {
    setParams(new URLSearchParams());
  };

  const clearSearcParam = () => {
    const nextParams = new URLSearchParams(params);

    nextParams.delete("searchBlog");

    setParams(nextParams);
  };

  return (
    <div className="hidden lg:flex flex-col gap-16 w-65.5 text-[16px] shrink">
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="border-b border-b-(--gray) w-full flex items-center justify-between">
          <input
            type="text"
            onChange={(e) => handleSearchChange(e.target.value)}
            className="outline-none py-3 w-full"
            placeholder="Search..."
            value={searchQuery}
          />

          {searchQuery ? (
            <button
              type="button"
              onClick={clearSearcParam}
              className="cursor-pointer"
            >
              <X className="size-4 text-(--dark-gray) hover:text-black transition-colors duration-200" />
            </button>
          ) : (
            <Search className="size-4 text-(--dark-gray)" />
          )}
        </div>
      </form>

      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold">Categories</h4>
        <ul className="flex flex-col gap-2 mt-5 text-(--dark-gray)">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`capitalize cursor-pointer transition-colors duration-150 hover:text-black ${
                activeCategory === cat ? "text-(--accent) font-medium" : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {params.size > 0 && (
        <StyledButton text="CLEAR FILTERS" btnType="button" fn={clearFilters} />
      )}
    </div>
  );
};

export default Filters;

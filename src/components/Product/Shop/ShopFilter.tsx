import Slider from "@mui/material/Slider";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import StyledButton from "../../StyledButton";
import { useQuery } from "@tanstack/react-query";
import { getProductsStats } from "../../../../features/products/requests";

const ShopFilter = () => {
  const [params, setParams] = useSearchParams();
  const setSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const searchParam = new URLSearchParams(params);

    const value = search.trim();

    if (value.length === 0) {
      searchParam.delete("shopSearch");
    } else {
      searchParam.set("shopSearch", value);
    }

    setParams(searchParam);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["getProductsPrices"],
    queryFn: getProductsStats,
  });

  const [search, setSearhValue] = useState(params.get("shopSearch") || "");
  const [inStockCheck, setInStockCheck] = useState(false);

  const [prices, setPrices] = useState<number[] | null>(null);

  const effectivePrices = prices ?? [
    Number(params.get("gte")) || data?._min.price || 0,
    Number(params.get("lte")) || data?._max.price || 50000,
  ];

  const setPriceFilter = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const searchParam = new URLSearchParams(params);

    searchParam.set("gte", String(effectivePrices[0]));
    searchParam.set("lte", String(effectivePrices[1]));

    setParams(searchParam);
  };

  const setIsInStock = () => {
    setInStockCheck((prev) => !prev);

    const searchParam = new URLSearchParams(params);

    if (!inStockCheck) {
      searchParam.set("stock", "true");
    } else {
      searchParam.delete("stock");
    }

    setParams(searchParam);
  };

  const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setParams((prev) => {
      const params = new URLSearchParams(prev);

      if (!value) {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }

      return params;
    });
  };

  const clearFilter = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("shopSearch");
    searchParams.delete("gte");
    searchParams.delete("lte");
    searchParams.delete("stock");
    searchParams.delete("sort");
    setParams(searchParams);

    setSearhValue("");
    setInStockCheck(false);
    setPrices([data?._min.price, data?._max.price]);
  };

  const searchParamVal = params.get("shopSearch");
  const lteParamVal = params.get("lte");
  const gteParamVal = params.get("gte");
  const stockParamVal = params.get("stock");
  const sortParamVal = params.get("sort");

  return (
    <div className="w-60 min-[1440px]:flex flex-col gap-10 text-[14px] hidden">
      <form onSubmit={(e) => setSearch(e)} className="w-full">
        <div className="border-b border-b-(--gray) w-full flex items-center justify-between">
          <input
            type="text"
            onChange={(e) => setSearhValue(e.target.value)}
            // {...methods.register("search")}
            className="outline-none py-3"
            placeholder="Search..."
            value={search}
          />

          <button>
            <Search className="size-4.5" />
          </button>
        </div>
      </form>

      <div className="px-3 py-4 border border-(--light-gray) rounded-sm w-full ">
        <select
          className="text-[14px] w-full outline-none"
          onChange={setSort}
          value={params.get("sort") || ""}
        >
          {" "}
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="date">Date</option>{" "}
        </select>
      </div>

      <form action="" onSubmit={(e) => setPriceFilter(e)}>
        {isFetching ? (
          <p>Loading</p>
        ) : (
          <Slider
            getAriaLabel={() => "Temperature range"}
            // value={prices}
            // onChange={handleChange}
            value={effectivePrices}
            onChange={(_, value) => setPrices(value as number[])}
            min={data?._min.price ?? 0}
            max={data?._max.price ?? 50000}
            valueLabelDisplay="auto"
            sx={{
              ".MuiSlider-thumb": {
                width: "2px",
                height: "10px",
                borderRadius: 0,
              },
              ".MuiSlider-thumb::after": {
                color: "black",
              },
              ".MuiSlider-thumb::before": {
                color: "black",
              },
              color: "black",
            }}
            // getAriaValueText={valuetext}
          />
        )}
        <div className="flex items-center justify-between">
          <span>
            Price: ${effectivePrices[0]} - ${effectivePrices[1]}
            {/* Price: ${prices[0]} - ${prices[1]} */}
          </span>
          <button className="text-(--accent)">Filter</button>
        </div>
      </form>

      <label htmlFor="switch" className="flex items-center justify-between">
        <p>In stock</p>
        <div className="">
          <div
            className={`w-8.25 h-5 rounded-full relative transition-colors ${
              inStockCheck ? "bg-(--accent)" : "bg-(--dark-gray)"
              // inStockCheck ? "bg-black" : "bg-(--dark-gray)"
            }`}
          >
            <span
              className={`bg-white block size-3.25 rounded-full absolute top-1/2 -translate-y-1/2 left-1  transition-transform ${
                inStockCheck ? "translate-x-full" : "translate-x-0"
              }`}
              // className={`bg-white block size-3.25 rounded-full absolute top-1/2 -translate-y-1/2 left-1 ${}`}
            ></span>
          </div>
          <input
            id="switch"
            type="checkbox"
            hidden
            onChange={() => setIsInStock()}
          />
        </div>
      </label>
      {((searchParamVal && searchParamVal?.trim().length > 0) ||
        (lteParamVal && lteParamVal.trim().length > 0) ||
        (gteParamVal && gteParamVal.trim().length > 0) ||
        (stockParamVal && stockParamVal.trim().length > 0) ||
        (sortParamVal && sortParamVal.trim().length > 0)) && (
        <StyledButton text="Clear params" btnType="button" fn={clearFilter} />
      )}
    </div>
  );
};

export default ShopFilter;

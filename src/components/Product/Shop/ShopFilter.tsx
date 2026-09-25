import Slider from "@mui/material/Slider";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import StyledButton from "../../StyledButton";
import { useQuery } from "@tanstack/react-query";
import { getProductsStats } from "../../../../features/products/requests";

const ShopFilter = () => {
  const [params, setParams] = useSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["getProductsPrices"],
    queryFn: getProductsStats,
  });

  const minPriceLimit = data?._min.price ?? 0;
  const maxPriceLimit = data?._max.price ?? 50000;

  const urlSearch = params.get("shopSearch") || "";
  const urlGte = Number(params.get("gte")) || minPriceLimit;
  const urlLte = Number(params.get("lte")) || maxPriceLimit;
  const inStockCheck = params.get("stock") === "true";

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [localPrices, setLocalPrices] = useState<number[]>([urlGte, urlLte]);

  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setLocalPrices([urlGte, urlLte]);
  }, [urlGte, urlLte]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextParams = new URLSearchParams(params);
      if (localSearch.trim()) {
        nextParams.set("shopSearch", localSearch);
      } else {
        nextParams.delete("shopSearch");
      }
      setParams(nextParams);
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const handlePriceChangeCommitted = (_: unknown, value: number | number[]) => {
    const prices = value as number[];
    const nextParams = new URLSearchParams(params);
    nextParams.set("gte", String(prices[0]));
    nextParams.set("lte", String(prices[1]));
    setParams(nextParams);
  };

  const handleStockToggle = () => {
    const nextParams = new URLSearchParams(params);
    if (!inStockCheck) {
      nextParams.set("stock", "true");
    } else {
      nextParams.delete("stock");
    }
    setParams(nextParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const nextParams = new URLSearchParams(params);
    if (!value) {
      nextParams.delete("sort");
    } else {
      nextParams.set("sort", value);
    }
    setParams(nextParams);
  };

  const clearFilter = () => {
    setParams(new URLSearchParams());
    setLocalSearch("");
    setLocalPrices([minPriceLimit, maxPriceLimit]);
  };

  const hasActiveFilters = params.size > 0;

  const clearSearch = () => {
    const nextParams = new URLSearchParams(params);

    nextParams.delete("shopSearch");

    setParams(nextParams);
  };

  return (
    <div className="w-60 min-[1440px]:flex flex-col gap-10 text-[14px] hidden">
      <div className="w-full">
        <div className="border-b border-b-(--gray) w-full flex items-center justify-between">
          <input
            type="text"
            onChange={(e) => setLocalSearch(e.target.value)}
            className="outline-none py-3 w-full"
            placeholder="Search..."
            value={localSearch}
          />

          {localSearch ? (
            <button
              type="button"
              className="cursor-pointer"
              onClick={clearSearch}
            >
              <X className="size-4 text-(--dark-gray)  hover:text-black transition-colors duration-200" />
            </button>
          ) : (
            <Search className="size-4 text-(--dark-gray)" />
          )}
        </div>
      </div>

      <div className="px-3 py-4 border border-(--light-gray) rounded-sm w-full">
        <select
          className="text-[14px] w-full outline-none bg-transparent cursor-pointer"
          onChange={handleSortChange}
          value={params.get("sort") || ""}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {isFetching ? (
          <p>Loading prices...</p>
        ) : (
          <Slider
            getAriaLabel={() => "Price range"}
            value={localPrices}
            onChange={(_, value) => setLocalPrices(value as number[])}
            onChangeCommitted={handlePriceChangeCommitted}
            min={minPriceLimit}
            max={maxPriceLimit}
            valueLabelDisplay="auto"
            sx={{
              ".MuiSlider-thumb": {
                width: "2px",
                height: "10px",
                borderRadius: 0,
              },
              ".MuiSlider-thumb::after, .MuiSlider-thumb::before": {
                color: "black",
              },
              color: "black",
            }}
          />
        )}
        <div className="flex items-center justify-between text-xs text-(--dark-gray)">
          <span>
            Price: ${localPrices[0]} - ${localPrices[1]}
          </span>
        </div>
      </div>

      <label
        htmlFor="switch"
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <p>In stock</p>
        <div>
          <div
            className={`w-8.25 h-5 rounded-full relative transition-colors ${
              inStockCheck ? "bg-(--accent)" : "bg-(--dark-gray)"
            }`}
          >
            <span
              className={`bg-white block size-3.25 rounded-full absolute top-1/2 -translate-y-1/2 left-1 transition-transform ${
                inStockCheck ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
          <input
            id="switch"
            type="checkbox"
            hidden
            checked={inStockCheck}
            onChange={handleStockToggle}
          />
        </div>
      </label>

      {hasActiveFilters && (
        <StyledButton text="Clear params" btnType="button" fn={clearFilter} />
      )}
    </div>
  );
};

export default ShopFilter;

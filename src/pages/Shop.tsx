import { useQuery } from "@tanstack/react-query";
import NoProducts from "../components/Product/Shop/NoProducts";
import ProductList from "../components/Product/Shop/ProductList";
import Section from "../components/Section";
import { getProducts } from "../../features/products/requests";
import ShopFilter from "../components/Product/Shop/ShopFilter";
// import { FormProvider, useForm } from "react-hook-form";
// import Slider from "@mui/material/Slider";
// import { useState } from "react";
// import { Search } from "lucide-react";
import { useSearchParams } from "react-router";
// import StyledButton from "../components/Dashboard/Address/StyledButton";

const Shop = () => {
  const [params] = useSearchParams();

  const shopSearchParamVal = params.get("shopSearch") || "";
  const lteParamVal = params.get("lte") || "";
  const gteParamVal = params.get("gte") || "";
  const stockParamVal = params.get("stock") || "";
  const sortParamVal = params.get("sort") || "";

  const { data = [], isFetching } = useQuery({
    queryKey: [
      "getShopProducts",
      shopSearchParamVal,
      lteParamVal,
      gteParamVal,
      stockParamVal,
      sortParamVal,
    ],
    queryFn: () =>
      getProducts(
        shopSearchParamVal,
        lteParamVal,
        gteParamVal,
        stockParamVal,
        sortParamVal,
      ),
    retry: false,
  });

  // const methods = useForm<{ search: string }>();

  // const [search, setSearhValue] = useState("");
  // const [inStockCheck, setInStockCheck] = useState(false);
  // const [prices, setPrices] = useState<number[]>([0, 50000]);

  // const handleChange = (event: Event, newValue: number[]) => {
  //   setPrices(newValue);
  //   console.log(newValue);
  // };

  // const setSearch = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   const searchParam = new URLSearchParams(params);

  //   const value = search.trim();

  //   if (value.length === 0) {
  //     searchParam.delete("search");
  //   } else {
  //     searchParam.set("search", value);
  //   }

  //   setParams(searchParam);
  // };

  // const setPriceFilter = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   const searchParam = new URLSearchParams(params);

  //   searchParam.set("lte", String(prices[0]));
  //   searchParam.set("gte", String(prices[1]));

  //   setParams(searchParam);
  // };

  // const setIsInStock = () => {
  //   setInStockCheck((prev) => !prev);

  //   const searchParam = new URLSearchParams(params);

  //   if (!inStockCheck) {
  //     searchParam.set("stock", "true");
  //   } else {
  //     searchParam.delete("stock");
  //   }

  //   setParams(searchParam);
  // };

  // const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;

  //   setParams((prev) => {
  //     const params = new URLSearchParams(prev);

  //     if (!value) {
  //       params.delete("sort");
  //     } else {
  //       params.set("sort", value);
  //     }

  //     return params;
  //   });
  // };

  // const clearFilter = () => {
  //   const searchParams = new URLSearchParams(params);
  //   searchParams.delete("search");
  //   searchParams.delete("gte");
  //   searchParams.delete("lte");
  //   searchParams.delete("stock");
  //   searchParams.delete("sort");
  //   setParams(searchParams);

  //   setSearhValue("");
  //   setInStockCheck(false);
  //   setPrices([0, 50000]);
  // };

  return (
    <Section
      // extraStyles={
      //   "flex flex-col pb-25 h-full flex-1 " +
      //   `${data.length === 0 ? "justify-center items-center" : ""}`
      // }
      extraStyles={"flex flex-col pb-25 h-full flex-1 "}
    >
      <h1
        className={`${
          data.length === 0 ? "hidden" : "text-[32px] font-semibold"
        }`}
      >
        Shop The Latest
      </h1>
      {/* <h1 className="text-[32px] font-semibold">Shop The Latest</h1> */}
      <div
        className={`${
          data.length === 0
            ? "flex h-full flex-1 justify-center items-center  "
            : "mt-10 flex gap-8"
        }`}
      >
        <ShopFilter />
        <div className="flex-1">
          <ProductList data={data} isPending={isFetching} isShop />
          {/* <NoProducts productLength={data.length} /> */}
          <NoProducts productLength={data.length} isPending={isFetching} />
        </div>
      </div>
    </Section>
  );
};

export default Shop;

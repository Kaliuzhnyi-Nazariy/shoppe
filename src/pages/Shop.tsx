import { useQuery } from "@tanstack/react-query";
import NoProducts from "../components/Product/Shop/NoProducts";
import ProductList from "../components/Product/Shop/ProductList";
import Section from "../components/Section";
import { getProducts } from "../../features/products/requests";
import ShopFilter from "../components/Product/Shop/ShopFilter";
import { useSearchParams } from "react-router";

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
      getProducts({
        search: shopSearchParamVal,
        lte: lteParamVal,
        gte: gteParamVal,
        stock: stockParamVal,
        sort: sortParamVal,
      }),
    retry: false,
  });

  return (
    <Section extraStyles={"flex flex-col pb-25 h-full flex-1 "}>
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
          <NoProducts productLength={data.length} isPending={isFetching} />
        </div>
      </div>
    </Section>
  );
};

export default Shop;

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../features/products/requests";
import ProductItem from "./ProductItem";
import type { IProduct } from "../../../features/products/interface.ts";

const ProductList = () => {
  // const listOfProduct: { title: string; price: number }[] = [
  //   { title: "title 1", price: 20.0 },
  //   { title: "title 2", price: 399.5 },
  //   { title: "title 3", price: 30.0 },
  //   { title: "title 4", price: 20.0 },
  //   { title: "title 5", price: 399.5 },
  //   { title: "title 6", price: 30.0 },
  // ];

  const { data, isPending } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    retry: false,
  });

  return (
    <span className="items-center justify-center">
      {isPending ? (
        "Loading..."
      ) : (
        <>
          {data && data.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
              {data.map((p: IProduct) => {
                return <ProductItem key={p.title} product={p} />;
              })}
            </ul>
          ) : (
            <p>No products</p>
          )}
        </>
      )}
    </span>
  );
};

export default ProductList;

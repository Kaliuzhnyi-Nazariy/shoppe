import { useQuery } from "@tanstack/react-query";
import CategoriesSlider from "../components/Home/CategoriesSlider";
import ProductList from "../components/Product/Shop/ProductList";
import Section from "../components/Section";
import { getProducts } from "../../features/products/requests";
import NoProducts from "../components/Product/Shop/NoProducts";
import type { Categories } from "../../features/products/interface";
import { useState } from "react";

const Home = () => {
  const [chosenCategory, setCategory] = useState<Categories | null>(null);
  const { data = [], isFetching } = useQuery({
    queryKey: ["getProducts", chosenCategory],
    queryFn: () =>
      getProducts({
        search: "",
        lte: "",
        gte: "",
        stock: "true",
        category: chosenCategory,
      }),
    retry: false,
  });

  const choseCategory = (category: Categories) => {
    if (chosenCategory === category) {
      setCategory(null);
    } else {
      setCategory(category);
    }
  };

  return (
    <Section
      extraStyles={
        "mb-18 " + `${data.length === 0 ? " flex flex-col h-full flex-1 " : ""}`
      }
    >
      <div
        className={` flex flex-col h-full flex-1 ${
          data.length === 0
            ? " justify-center items-center"
            : // ? " flex flex-col h-full flex-1 justify-center items-center"
              ""
        }`}
      >
        <CategoriesSlider
          isPending={isFetching}
          choseCategory={choseCategory}
          chosenCategory={chosenCategory}
        />
        <ProductList data={data} isPending={isFetching} extraStyle="mt-4" />
        <NoProducts productLength={data.length} isPending={isFetching} />
      </div>
    </Section>
  );
};

export default Home;

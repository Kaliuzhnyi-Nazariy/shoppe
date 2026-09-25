import { useQuery } from "@tanstack/react-query";
import CategoriesSlider from "../components/Home/CategoriesSlider";
import ProductList from "../components/Product/Shop/ProductList";
import Section from "../components/Section";
import { getProducts } from "../../features/products/requests";
import type { Categories } from "../../features/products/interface";
// import { useState } from "react";
import { useSearchParams } from "react-router";

const Home = () => {
  const [params, setParams] = useSearchParams();

  const chosenCategory = params.get("chosenCategory") as Categories | null;

  const setCategory = (category: Categories) =>
    setParams((prev) => {
      const prevParams = new URLSearchParams(prev);

      if (prevParams.get("chosenCategory") === category) {
        prevParams.delete("chosenCategory");
      } else {
        prevParams.set("chosenCategory", category);
      }

      return prevParams;
    });

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

  return (
    <Section extraStyles={"mb-18 " + `${data.length === 0 ? "  " : ""}`}>
      <CategoriesSlider
        isPending={isFetching}
        choseCategory={setCategory}
        // choseCategory={choseCategory}
        chosenCategory={chosenCategory}
      />

      <ProductList data={data} isPending={isFetching} extraStyle="mt-4" />
    </Section>
  );
};

export default Home;

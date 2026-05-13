import { useQuery } from "@tanstack/react-query";
import CategoriesSlider from "../components/Home/CategoriesSlider";
import ProductList from "../components/Product/Shop/ProductList";
import Section from "../components/Section";
import { getProducts } from "../../features/products/requests";
import NoProducts from "../components/Product/Shop/NoProducts";

const Home = () => {
  const { data = [], isFetching } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => getProducts("", "", "", "true"),
    retry: false,
  });

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
        <CategoriesSlider isPending={isFetching} />
        <ProductList data={data} isPending={isFetching} extraStyle="mt-4" />
        <NoProducts productLength={data.length} isPending={isFetching} />
      </div>
    </Section>
  );
};

export default Home;

import ProductList from "../components/Product/ProductList";
import Section from "../components/Section";

const Shop = () => {
  return (
    <Section extraStyles="flex flex-col">
      <ProductList />
    </Section>
  );
};

export default Shop;

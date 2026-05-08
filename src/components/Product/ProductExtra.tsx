import { ProductAccordion } from "./Accordion";
import type { IProductFull } from "../../../features/products/interface";
import ProductExrtraTabs from "./ProductExrtraTabs";

const ProductExtra = ({ data }: { data: IProductFull }) => {
  return (
    <>
      <ProductAccordion
        reviews={data.reviewCount}
        description={data.description}
        additionalInformation={data.additionalInformation}
      />
      <ProductExrtraTabs
        reviews={data.reviewCount}
        description={data.description}
        additionalInformation={data.additionalInformation}
      />
    </>
  );
};

export default ProductExtra;

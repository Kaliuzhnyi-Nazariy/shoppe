import { ProductAccordion } from "./ProductAccordion/Accordion";
import type { IProductFull } from "../../../features/products/interface";
import ProductExrtraTabs from "./ProductExrtraTabs";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../../features/review/requests";

const ProductExtra = ({ data }: { data: IProductFull }) => {
  const { data: reviews } = useQuery({
    queryKey: ["getReview", data.id],
    queryFn: () => getReviews(data.id),
  });

  return (
    <>
      <ProductAccordion
        reviews={reviews}
        reviewsCount={data.reviewCount}
        description={data.description}
        additionalInformation={data.additionalInformation}
      />
      <ProductExrtraTabs
        reviews={reviews}
        reviewsCount={data.reviewCount}
        description={data.description}
        additionalInformation={data.additionalInformation}
      />
    </>
  );
};

export default ProductExtra;

import { Link, useNavigate, useParams } from "react-router";
import Section from "../components/Section";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../features/products/requests";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import ProductPhoto from "../components/Product/ProductPhoto";
import ProductInfo from "../components/Product/ProductInfo";
import ProductExtra from "../components/Product/ProductExtra";
import { OrbitProgress } from "react-loading-indicators";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();

  const { data, isPending } = useQuery({
    queryKey: ["getProduct", { productId }],
    queryFn: () => getProductById(productId!),
    retry: false,
  });

  if (!isPending && !data) {
    navigate("/shop");
  }

  const images =
    data?.photos.map((p: { id: string; link: string }) => p.link) || [];

  return (
    <Section extraStyles="pb-25 flex flex-col flex-1">
      {isPending ? (
        <div className="flex-1 flex items-center justify-center h-full">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <>
          <div className="min-[1440px]:flex min-[1440px]:gap-16">
            <ProductPhoto data={data} images={images} />
            <ProductInfo data={data} />
          </div>
          <ProductExtra data={data} />
          <Link
            to="/shop"
            className="flex items-center justify-between w-full mt-9 min-[1440px]:hidden"
          >
            <p>Continue Shopping</p>
            <ArrowRight className="size-4" />
          </Link>
        </>
      )}
    </Section>
  );
};

export default Products;

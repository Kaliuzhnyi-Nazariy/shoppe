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

  // const [productsAddToCart, setProductsAddToCart] = useState(1);

  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  // const queryClient = useQueryClient();

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
// {
//   data.photos.length !== 0 ? (
//     <div className="min-[1440px]:flex-3">
//       {/* <div className="min-[1440px]:w-3/5 min-[1440px]:flex-1"> */}
//       <PhotoAccordion images={images} isOutOfStock={data.amount === 0} />
//     </div>
//   ) : (
//     <div className="min-[1440px]:flex-3">
//       <div className="bg-pink-400 w-full h-93.5"></div>
//       {/* <div className="bg-pink-400 w-full min-[1440px]:w-3/5 h-93.5"></div> */}
//       <div className="mt-4 h-px bg-black"></div>
//     </div>
//   );
// }

// {/* <div className="flex flex-col flex-2">
//   {/* <div className="flex flex-col w-full"> */}
//   <div className="flex justify-between mt-6 items-end">
//     <div>
//       <p className="text-[20px] min-[1440px]:text-[26px] ">{data.title}</p>
//       <p className="text-[16px] text-(--accent) mt-1.25 min-[1440px]:mt-6 min-[1440px]:text-xl">
//         $ {data.price}
//       </p>
//     </div>

//     <div className="pb-2 min-[1440px]:hidden">
//       <button type="button" onClick={shareProduct}>
//         <Share2 className="size-3.5" />
//       </button>
//     </div>
//   </div>
//   <div className="min-[1440px]:flex min-[1440px]:flex-col-reverse min-[1440px]:mt-15 text-xs min-[1440px]:text-[16px]">
//     {role === "admin" ? (
//       <ul className="flex flex-col gap-4">
//         <li>
//           <StyledButton
//             text="UPDATE PRODUCT"
//             fn={adminRedirect}
//             type="secondary"
//             btnType="button"
//             extraStyles="w-full py-1.5 mt-8"
//           />
//         </li>
//         <li>
//           <StyledButton
//             text="DELETE PRODUCT"
//             loadingText="Deleting product..."
//             fn={() => deleteMutate(productId!)}
//             pending={deletePending}
//             btnType="button"
//             extraStyles="w-full py-1.5"
//           />
//         </li>
//         <li>
//           <StyledButton
//             text={data.isArchived ? "UNARCHIVE PRODUCT" : "ARCHIVE PRODUCT"}
//             loadingText="Archiving product..."
//             fn={() => archiveProductFn(productId!)}
//             pending={archivingPending}
//             btnType="button"
//             extraStyles="w-full py-1.5"
//           />
//         </li>
//       </ul>
//     ) : (
//       <div className="min-[1440px]:flex gap-6 mt-8 min-[1440px]:mt-12">
//         <div className="bg-(--light-gray) text-(--dark-gray) flex p-3.5 items-center gap-6 rounded-sm">
//           <button
//             type="button"
//             onClick={() => removeFromCartButton()}
//             className="disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={1 === productsAddToCart}
//           >
//             -
//           </button>
//           <p>{productsAddToCart}</p>
//           <button
//             type="button"
//             onClick={() => addToCartButton()}
//             className="disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={data.amount === productsAddToCart}
//           >
//             +
//           </button>
//         </div>

//         <StyledButton
//           text="ADD TO CART"
//           loadingText="Adding to cart..."
//           fn={addProduct}
//           isValid={data.amount !== 0}
//           pending={isAdding}
//           type="secondary"
//           btnType="button"
//           extraStyles="w-full py-1.5 min-[1440px]:font-semibold min-[1440px]:py-4"
//         />
//       </div>
//     )}
//     {data.description && (
//       <article className="h-10 min-[1440px]:h-full overflow-hidden text-ellipsis  text-wrap mt-4">
//         {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
//                   vero quisquam labore reiciendis quas eos facilis, sapiente
//                   consectetur minus ullam commodi neque sed qui aliquam veniam
//                   suscipit ipsum, aut sunt? */}
//         {data.description}
//       </article>
//     )}
//     <div className="min-[1440px]:hidden">
//       <p className="mt-1.5">View more</p>
//       <div className="w-full h-px bg-gray mt-4"></div>
//     </div>
//   </div>
// </div>; */}

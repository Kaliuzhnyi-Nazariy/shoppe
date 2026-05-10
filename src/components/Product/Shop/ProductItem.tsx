import { Link } from "react-router";
import type { IProduct } from "../../../../features/products/interface";

const ProductItem = ({
  product,
  isShop = false,
}: {
  product: IProduct;
  isShop?: boolean;
}) => {
  return (
    <Link
      to={"/product/" + product.id}
      className="rounded-sm relative text-xs min-w-34 max-w-94  justify-self-center lg:text-xl flex flex-col items-center "
    >
      {product?.photos?.length > 0 ? (
        <>
          <img
            src={product.photos[0].link}
            alt={product.title}
            // className="size-34 object-cover object-center relative"
            // className="min-w-34 min-h-34 max-h-94 max-w-94 object-cover object-center relative"
            className={`size-34  rounded-sm object-contain object-center relative ${
              isShop ? "lg:size-75" : "lg:size-94!"
            }`}
          />
        </>
      ) : (
        <div
          // className="size-34 rounded-sm bg-purple-500 relative"
          className="size-34 lg:size-94! rounded-sm bg-purple-500 relative"
        ></div>
      )}

      {product.amount === 0 && (
        // <div className="absolute size-34 top-0 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white/50">
        <div
          className={`absolute size-34 ${
            isShop ? "lg:size-75" : "lg:size-94"
          } top-0 left-0 flex items-center justify-center bg-white/50`}
        >
          <p>Out of stock</p>
        </div>
      )}

      {product.isArchived && (
        <p className="bg-(--light-gray) px-2 py-0.5 rounded-full text-[8px] uppercase font-light absolute top-1.5 right-1.5 lg:text-sm lg:px-4 lg:py-1 lg:top-4 lg:right-4">
          archived
        </p>
      )}
      {/* <div className="mt-1.5 text-[14px] flex items-center justify-between">
        <p className=" ">{product.title}</p>
        {product.isArchived && (
          <p className="bg-(--light-gray) px-2 py-0.5 rounded-full text-[10px] uppercase font-light">
          archived
          </p>
          )}
          </div> */}
      <p className="mt-1.5 text-[14px] lg:text-xl ">{product.title}</p>
      <p className="mt-1 text-(--accent)">
        <span>$ </span>
        {product.price}
      </p>

      {product.amount !== 0 && product.amount <= 50 && (
        <p className="bg-white text-(--accent) px-2 py-0.5 rounded-full text-[8px] uppercase font-light absolute top-1.5 left-1.5 lg:text-sm lg:px-4 lg:py-1 lg:top-4 lg:left-4">
          Only {product.amount} left
        </p>
      )}
    </Link>
  );
};

export default ProductItem;

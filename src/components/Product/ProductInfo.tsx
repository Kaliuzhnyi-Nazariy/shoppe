import { Share2 } from "lucide-react";
import type { IProduct } from "../../../features/products/interface";
import StyledButton from "../StyledButton";
import { useSelector } from "react-redux";
import { userLoggedIn, userRole } from "../../../features/user/selectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useCart } from "../../hooks/useGetLocalCart";
import {
  archiveProduct,
  deleteProduct,
} from "../../../features/products/requests";
import { addToCart } from "../../../features/cart/requests";
import { v4 } from "uuid";
import { errorToast, successToast } from "../toast";

const ProductInfo = ({ data }: { data: IProduct }) => {
  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const [productsAddToCart, setProductsAddToCart] = useState(1);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const isUserLoggedIn = useSelector(userLoggedIn);

  const { addToCart: addToLocalCart } = useCart();

  const { mutate: addToCartFn, isPending: isAdding } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: (dataSubmit: { productId: string; quantity: number }) =>
      addToCart(dataSubmit),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      setProductsAddToCart(1);
      successToast("Product is added to cart");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const addProduct = () => {
    if (isUserLoggedIn) {
      addToCartFn({ productId: data.id!, quantity: productsAddToCart });
      //   addToCartFn({ productId: productId!, quantity: productsAddToCart });
      return;
    }

    addToLocalCart({
      id: v4(),
      price: data.price,
      quantity: productsAddToCart,
      userId: null,
      product: {
        amount: data.amount,
        id: data.id,
        photos: data.photos,
        rate: data.rate,
        title: data.title,
        isArchived: data.isArchived,
        description: "",
        reviewCount: 0,
      },
    });

    setProductsAddToCart(1);
    successToast("Product is added to cart");
  };

  const adminRedirect = () => {
    navigate("/product/update/" + data.id);
    // navigate("/product/update/" + productId);
  };

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      navigate("/shop");
      successToast("Product is deleted!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: archiveProductFn, isPending: archivingPending } = useMutation(
    {
      mutationFn: (id: string) => archiveProduct(id),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["getProducts"] });
        navigate("/shop");
        successToast("Product is archived!");
      },
      onError(err) {
        const error = err as {
          response?: { data?: { message: string } };
        };
        errorToast(error.response?.data?.message || "Something went wrong!");
      },
    },
  );

  const addToCartButton = () => {
    if (productsAddToCart === data.amount) {
      return;
    } else {
      setProductsAddToCart((prev) => prev + 1);
    }
  };

  const removeFromCartButton = () => {
    if (productsAddToCart - 1 === 0) {
      return;
    } else {
      setProductsAddToCart((prev) => prev - 1);
    }
  };

  const role = useSelector(userRole);

  return (
    <div className="flex flex-col flex-2">
      {/* <div className="flex flex-col w-full"> */}
      <div className="flex justify-between mt-6 items-end">
        <div>
          <p className="text-[20px] min-[1440px]:text-[26px] ">{data.title}</p>
          <p className="text-[16px] text-(--accent) mt-1.25 min-[1440px]:mt-6 min-[1440px]:text-xl">
            $ {data.price}
          </p>
        </div>

        <div className="pb-2 min-[1440px]:hidden">
          <button type="button" onClick={shareProduct}>
            <Share2 className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="min-[1440px]:flex min-[1440px]:flex-col-reverse min-[1440px]:mt-15 text-xs min-[1440px]:text-[16px]">
        {role === "admin" ? (
          <ul className="flex flex-col gap-4">
            <li>
              <StyledButton
                text="UPDATE PRODUCT"
                fn={adminRedirect}
                type="secondary"
                btnType="button"
                extraStyles="w-full py-1.5 mt-8"
              />
            </li>
            <li>
              <StyledButton
                text="DELETE PRODUCT"
                loadingText="Deleting product..."
                fn={() => deleteMutate(data.id)}
                // fn={() => deleteMutate(productId!)}
                pending={deletePending}
                btnType="button"
                extraStyles="w-full py-1.5"
              />
            </li>
            <li>
              <StyledButton
                text={data.isArchived ? "UNARCHIVE PRODUCT" : "ARCHIVE PRODUCT"}
                loadingText="Archiving product..."
                fn={() => archiveProductFn(data.id!)}
                // fn={() => archiveProductFn(productId!)}
                pending={archivingPending}
                btnType="button"
                extraStyles="w-full py-1.5"
              />
            </li>
          </ul>
        ) : (
          <div className="min-[1440px]:flex gap-6 mt-8 min-[1440px]:mt-12">
            <div className="hidden min-[1440px]:flex bg-(--light-gray) text-(--dark-gray) p-3.5 items-center gap-6 rounded-sm">
              <button
                type="button"
                onClick={() => removeFromCartButton()}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={1 === productsAddToCart}
              >
                -
              </button>
              <p>{productsAddToCart}</p>
              <button
                type="button"
                onClick={() => addToCartButton()}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={data.amount === productsAddToCart}
              >
                +
              </button>
            </div>

            <StyledButton
              text="ADD TO CART"
              loadingText="Adding to cart..."
              fn={addProduct}
              isValid={data.amount !== 0}
              pending={isAdding}
              type="secondary"
              btnType="button"
              extraStyles="w-full py-1.5 min-[1440px]:font-semibold min-[1440px]:py-4"
            />
          </div>
        )}
        {data.description && (
          <article className="h-10 min-[1440px]:h-full overflow-hidden text-ellipsis  text-wrap mt-4">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  vero quisquam labore reiciendis quas eos facilis, sapiente
                  consectetur minus ullam commodi neque sed qui aliquam veniam
                  suscipit ipsum, aut sunt? */}
            {data.description}
          </article>
        )}
        <div className="min-[1440px]:hidden">
          <p className="mt-1.5">View more</p>
          <div className="w-full h-px bg-gray mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

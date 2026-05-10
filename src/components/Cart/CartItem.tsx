import { useState } from "react";
import type { ICartItem } from "../../../features/cart/interface";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  reduceQuantity,
  removeFromCart,
} from "../../../features/cart/requests";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../../features/user/selectors";
import { useCart } from "../../hooks/useGetLocalCart";
import { errorToast, successToast } from "../toast";
import { OrbitProgress } from "react-loading-indicators";

const CartItem = ({
  item,
  productAmount,
}: {
  item: ICartItem;
  productAmount: number;
}) => {
  const isAuthenticated = useSelector(userLoggedIn);
  const [productQuantity, setQuantity] = useState(item.quantity || 0);

  const { mutate: addToCartFn, isPending: isAdding } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: (data: { productId: string; quantity: number }) =>
      addToCart(data),
    onSuccess() {
      setQuantity((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: removeFromCartFn, isPending: isReducing } = useMutation({
    mutationKey: ["removeFromCart"],
    mutationFn: (data: { productId: string; quantity: number }) =>
      reduceQuantity(data),
    onSuccess() {
      setQuantity((prev) => prev - 1);
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteFromCart, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteItemFromCart"],
    mutationFn: (productId: string) => removeFromCart(productId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      successToast("Product is deleted from cart");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const {
    addQuantity: addQuantityInLocal,
    reduceQuantity: reduceInLocal,
    deleteFromCart: deleteFromLocalCart,
  } = useCart();

  // useEffect(() => {
  //   if (item) {
  //     setQuantity(item.quantity);
  //   }
  // }, [item]);
  const addQuantityState = () => {
    setQuantity((prev) => prev + 1);
  };

  const reduceQuantityState = () => {
    if (productQuantity !== 1) {
      setQuantity((prev) => prev - 1);
    } else {
      return;
    }
  };

  const addQuantity = (productId: string) => {
    // const productMap = new Map(data?.items.map((i) => [i.id, i.product]));

    // // console.log(productMap.get(productId));
    // const isQuantityIsLowerThanProductStock =
    //   (productMap.get(productId)?.amount || 0) < quantity + 1;

    // console.log(productMap.get(productId)?.amount || 0);

    // console.log("quantity: ", quantity + 1);

    // console.log({ isQuantityIsLowerThanProductStock });

    // if (isQuantityIsLowerThanProductStock) {
    //     console.log("added");
    // }

    // if (quantity + 1 <= productAmount) {
    //   setQuantity(quantity + 1);
    // }
    if (isAuthenticated) {
      addToCartFn({ productId, quantity: 1 });
    } else {
      addQuantityInLocal(productId, addQuantityState);

      // const localCart = localStorage.getItem("cart");

      // const parsedLocalCart = localCart ? JSON.parse(localCart) : [];
      // const existedProduct = parsedLocalCart.find(
      //   (c: { product: { id: string } }) => c.product.id === productId,
      // );

      // if (existedProduct) {
      //   existedProduct.quantity += 1;
      //   setQuantity((prev) => prev + 1);
      // }

      // localStorage.setItem("cart", JSON.stringify(parsedLocalCart));
      // window.dispatchEvent(new Event("updateCart"));

      // window.dispatchEvent(new Event("cartCountUpdate"));
      // console.log("add: ", { productId });
    }

    // console.log({ productId });
    // console.log({ productQuantity });
  };

  const removeQuantity = (productId: string) => {
    // console.log("remove one: ", { productId });
    // removeFromCartFn({ productId, quantity: 1 });
    // if (quantity !== 1) {
    //   setQuantity(quantity - 1);
    // }

    if (isAuthenticated) {
      removeFromCartFn({ productId, quantity: 1 });
    } else {
      reduceInLocal(productId, reduceQuantityState);

      //   const localCart = localStorage.getItem("cart");

      //   const parsedLocalCart = localCart ? JSON.parse(localCart) : [];
      //   const existedProduct = parsedLocalCart.find(
      //     (c: { product: { id: string } }) => c.product.id === productId,
      //   );

      // if (existedProduct) {
      //   if (existedProduct.quantity !== 1) {
      //     existedProduct.quantity -= 1;
      //   }
      // if (productQuantity !== 1) {
      //   setQuantity((prev) => prev - 1);
      // }
      // }

      //   localStorage.setItem("cart", JSON.stringify(parsedLocalCart));
      //   window.dispatchEvent(new Event("updateCart"));
      // }
    }
  };

  const handleDelete = (productId: string) => {
    if (isAuthenticated) {
      deleteFromCart(productId);
    } else {
      deleteFromLocalCart(productId);
      successToast("Product is deleted from cart");

      // const localCart = localStorage.getItem("cart");

      // const parsedLocalCart = localCart ? JSON.parse(localCart) : [];
      // const productIndex = parsedLocalCart.findIndex(
      //   (c: { product: { id: string } }) => c.product.id === productId,
      // );

      // if (productIndex !== -1) {
      //   parsedLocalCart.splice(productIndex, 1);
      // }

      // localStorage.setItem("cart", JSON.stringify(parsedLocalCart));
      // window.dispatchEvent(new Event("cartCountUpdate"));
      // window.dispatchEvent(new Event("updateCart"));
    }
  };

  return (
    <li className="flex gap-2 relative">
      {isDeleting ? (
        <div className="flex flex-col items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <>
          <button
            type="button"
            className="absolute size-1.5 left-auto right-5 top-1.75 -translate-x-1/2 hover:cursor-pointer"
            onClick={() => handleDelete(item.product.id)}
          >
            <X className="" />
          </button>
          <div className="relative">
            {item.product.photos.length > 0 ? (
              <img
                src={item.product.photos[0].link}
                className="size-34 rounded-sm object-contain"
              />
            ) : (
              <div className="size-34 rounded-sm bg-(--accent)"></div>
            )}

            {item.product.amount === 0 && (
              <div className="absolute w-full h-full bg-white/50 top-0 left-0 flex items-center justify-center">
                <p>Out of stock</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between lg:flex-row lg:w-1/2">
            <div>
              <p>{item.product.title}</p>
              <p className="text-(--accent)">$ {item.price}</p>
            </div>
            <div className="flex gap-2 text-(--dark-gray) lg:p-3 lg:bg-(--light-gray) lg:h-13.5 lg:items-center">
              <p className="lg:hidden">QTY: </p>
              {isAdding || isReducing ? (
                <div className="flex flex-col items-center justify-center">
                  <OrbitProgress color="var(--gray)" size="small" />
                </div>
              ) : (
                <div className="flex items-center gap-2 lg:items-start lg:gap-6">
                  <button
                    type="button"
                    onClick={() => removeQuantity(item.product.id)}
                    disabled={productQuantity == 1}
                    className="disabled:opacity-50"
                  >
                    -
                  </button>
                  <p>{productQuantity}</p>
                  <button
                    type="button"
                    onClick={() => addQuantity(item.product.id)}
                    className="disabled:opacity-50"
                    disabled={productQuantity === productAmount}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
};
export default CartItem;

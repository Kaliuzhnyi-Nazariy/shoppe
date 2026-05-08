import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../features/cart/requests";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../../features/user/selectors";
import CartList from "./CartList";
import Total from "./Total";
import { useCart } from "../../hooks/useGetLocalCart";
import type { ICartItem } from "../../../features/cart/interface";
import { useMemo } from "react";
import { ShoppingCart } from "lucide-react";

const CartComponent = () => {
  const isAuthenticated = useSelector(userLoggedIn);
  const { data, isPending } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    retry: false,
    enabled: isAuthenticated,
  });

  const { cart } = useCart();

  // const showingCondition =
  //   (isAuthenticated && data && data?.items.length > 0) ||
  //   (!isAuthenticated && cart?.length > 0);

  const dataToSend: ICartItem[] =
    isAuthenticated && data ? data.items : cart ?? [];

  const activeProducts = useMemo(() => {
    return dataToSend.filter((p) => p.product && !p.product.isArchived);
  }, [dataToSend]);

  const showingCondition =
    (isAuthenticated && activeProducts.length > 0) ||
    (!isAuthenticated && activeProducts?.length > 0);

  return (
    <>
      {isAuthenticated && isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          {showingCondition ? (
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="lg:w-1/2">
                <p className="lg:hidden">Shopping Cart</p>

                <CartList data={activeProducts} />
              </div>
              <Total data={activeProducts} />
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1 flex-col gap-4 text-(--dark-gray)">
              <ShoppingCart className="size-24" />
              <p>You don't have products in cart!</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CartComponent;

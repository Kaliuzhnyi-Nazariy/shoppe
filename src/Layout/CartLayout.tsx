import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../features/user/selectors";
import { addMany } from "../../features/cart/requests";
import { useQueryClient } from "@tanstack/react-query";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isUserLoggedIn) return;

    const syncCart = async () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (cart.length > 0) {
        try {
          await addMany(cart);
          queryClient.invalidateQueries({ queryKey: ["getCart"] });
          localStorage.removeItem("cart");
        } catch (error) {
          console.error(error);
        }
      }
    };

    syncCart();
  }, [isUserLoggedIn]);

  return <>{children}</>;
};

export default CartLayout;

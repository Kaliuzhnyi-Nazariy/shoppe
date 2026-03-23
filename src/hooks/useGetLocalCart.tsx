import { useSelector } from "react-redux";
import { userLoggedIn } from "../../features/user/selectors";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../features/cart/requests";

export const useCartCount = () => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const [guestCount, setGuestCount] = useState(0);

  const { data } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    enabled: isUserLoggedIn,
  });

  useEffect(() => {
    if (isUserLoggedIn) return;

    const update = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setGuestCount(cart.length);
    };

    update();
    window.addEventListener("cartUpdate", update);

    return () => window.removeEventListener("cartUpdate", update);
  }, [isUserLoggedIn]);

  if (isUserLoggedIn) {
    return data?.items.length || 0;
  }

  return guestCount;
};

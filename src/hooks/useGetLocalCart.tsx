// // If it will work just add prop which will update quantity -       setQuantity((prev) => prev - 1);

import { useEffect, useState } from "react";
import type { ICartItem } from "../../features/cart/interface";

export const useCart = () => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const update = () => {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    };

    update();
    window.addEventListener("updateCart", update);

    return () => window.removeEventListener("updateCart", update);
  }, []);

  const addToCart = (data: ICartItem) => {
    const existingProduct = cart.find(
      (item: { product: { id: string }; quantity: number }) =>
        item.product.id === data.product.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(data);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("updateCart"));
  };

  const addQuantity = (productId: string, stateFn: () => void) => {
    const existedProduct = cart.find(
      (c: { product: { id: string } }) => c.product.id === productId,
    );

    if (existedProduct) {
      existedProduct.quantity += 1;
    }
    stateFn();

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("updateCart"));
  };

  const reduceQuantity = (productId: string, stateFn: () => void) => {
    const existedProduct = cart.find(
      (c: { product: { id: string }; quantity: number }) =>
        c.product.id === productId,
    );

    // if (existedProduct && existedProduct.quantity !== 1) {
    //   existedProduct.quantity -= 1;
    // }

    if (existedProduct) {
      if (existedProduct.quantity !== 1) {
        existedProduct.quantity -= 1;
      }
      stateFn();
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("updateCart"));
  };

  const deleteFromCart = (productId: string) => {
    const productIndex = cart.findIndex(
      (c: { product: { id: string } }) => c.product.id === productId,
    );

    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("updateCart"));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("updateCart"));
  };

  return {
    cart,
    cartCount: cart.length,
    addToCart,
    addQuantity,
    reduceQuantity,
    deleteFromCart,
    clearCart,
  };
};

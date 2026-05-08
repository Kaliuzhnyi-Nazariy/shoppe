import type { ICartItem } from "../../../features/cart/interface";
import CartItem from "./CartItem";

const CartList = ({ data }: { data: ICartItem[] }) => {
  const productAmountList =
    data &&
    new Map(data.map((p: ICartItem) => [p.product.id, p.product.amount]));

  return (
    <ul className="flex flex-col gap-5.5 pt-4 ">
      {data.map((item: ICartItem) => {
        return (
          <CartItem
            item={item}
            key={item.id}
            // productAmount={5}
            productAmount={productAmountList.get(item.product.id)!}
          />
        );
      })}
    </ul>
  );
};

export default CartList;

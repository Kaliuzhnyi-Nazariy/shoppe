import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../features/cart/requests";
import Section from "../components/Section";

const Cart = () => {
  const { data, isPending } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
  });

  console.log({ data });

  return (
    <Section>
      <p>Shopping Cart</p>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          {data && data.items.length > 0 ? (
            <ul className="flex flex-col gap-5.5 pt-4 pb-7">
              {data.items.map(
                (item: {
                  id: string;
                  price: number;
                  quantity: number;
                  product: { title: string };
                }) => {
                  return (
                    <li key={item.id} className="flex gap-2">
                      <div className="size-34 rounded-sm bg-(--accent)"></div>
                      <div>
                        <p>{item.product.title}</p>
                      </div>
                    </li>
                  );
                },
              )}
            </ul>
          ) : (
            <p>No data</p>
          )}
        </>
      )}
    </Section>
  );
};

export default Cart;

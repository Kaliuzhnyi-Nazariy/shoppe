import CartComponent from "../components/Cart/CartComponent";
import Section from "../components/Section";

const Cart = () => {
  return (
    <Section extraStyles="flex flex-col flex-1">
      <CartComponent />
    </Section>
  );
};

export default Cart;

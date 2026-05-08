import CartComponent from "../components/Cart/CartComponent";
import Section from "../components/Section";

const Cart = () => {
  return (
    <Section extraStyles="flex flex-col">
      <CartComponent />
    </Section>
  );
};

export default Cart;

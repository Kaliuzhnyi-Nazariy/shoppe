import type React from "react";
import type { ICartItem } from "../../../features/cart/interface";
import StyledButton from "../StyledButton";
import type { SetStateAction } from "react";
import type { PaymentMethods } from "../../pages/Checkout";

const Check = ({
  cartData,
  subTotal,
  setPaymentOption,
  isValid,
  pending,
  chosenPaymentMethod,
}: {
  cartData: ICartItem[];
  subTotal: number;
  setPaymentOption: React.Dispatch<SetStateAction<PaymentMethods | null>>;
  isValid: boolean;
  pending: boolean;
  chosenPaymentMethod: "stripe" | "cashOnDelivery" | "checkPayment" | null;
}) => {
  return (
    <div className="lg:w-1/2">
      <h5 className="lg:text-[26px]">Your Order</h5>
      <div className="mt-5 pt-5 px-4 pb-6 bg-(--light-gray) rounded-sm">
        <span className="flex justify-between uppercase">
          <p>product</p>
          <p>total</p>
        </span>
        <hr className="mt-4 text-(--gray)" />
        <ul className="mt-6 flex flex-col gap-11">
          {cartData.map((cd) => {
            return (
              <li className="w-full flex justify-between" key={cd.id}>
                <p>{cd.product.title}</p>
                <p>$ {cd.price * cd.quantity}</p>
              </li>
            );
          })}
        </ul>
        <hr className="mt-5 text-(--gray)" />
        <span className="flex justify-between uppercase mt-4">
          <p>subtotal</p>
          <p>$ {subTotal}</p>
        </span>
        <hr className="mt-5 text-(--gray)" />
        <span className="flex justify-between mt-6">
          <p className="uppercase">Shipping</p>
          <p className="text-(--dark-gray)">Free shipping</p>
        </span>
        <hr className="mt-5 text-(--gray)" />
        <span className="flex justify-between mt-6">
          <p className="uppercase">Total</p>
          <p className="text-(--dark-gray)">${subTotal}</p>
        </span>
        <hr className="mt-5 text-(--gray)" />
        {/* <ul className="mt-10 flex flex-col gap-5">
          <li>
            <label htmlFor="checkPayment" className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                id="checkPayment"
                onChange={() => setPaymentOption("checkPayment")}
              />
              <p>Check payments</p>
            </label>
          </li>
          <li>
            <label htmlFor="cashOnDelivery" className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                id="cashOnDelivery"
                className="checked:outline-black"
                onClick={() => setPaymentOption("cashOnDelivery")}
              />
              <p>Cash on delivery</p>
            </label>
          </li>
          <li>
            <label htmlFor="stripe" className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                id="stripe"
                onClick={() => setPaymentOption("stripe")}
              />
              <p>Stripe</p>
            </label>
          </li>
        </ul> */}
        <ul className="mt-10 flex flex-col gap-5">
          <li>
            <label htmlFor="checkPayment" className="flex items-center gap-2">
              <input
                type="radio"
                checked={chosenPaymentMethod == "checkPayment"}
                name="paymentMethod"
                id="checkPayment"
                onChange={() => setPaymentOption("checkPayment")}
              />
              <p>Check payments</p>
            </label>
          </li>
          <li>
            <label htmlFor="cashOnDelivery" className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                checked={chosenPaymentMethod == "cashOnDelivery"}
                id="cashOnDelivery"
                className="checked:outline-black"
                onChange={() => setPaymentOption("cashOnDelivery")}
              />
              <p>Cash on delivery</p>
            </label>
          </li>
          <li>
            <label htmlFor="stripe" className="flex items-center gap-2">
              <input
                type="radio"
                checked={chosenPaymentMethod == "stripe"}
                name="paymentMethod"
                id="stripe"
                onChange={() => setPaymentOption("stripe")}
              />
              <p>Stripe</p>
            </label>
          </li>
        </ul>
        <StyledButton
          text="Place order"
          btnType="submit"
          extraStyles="mt-9 w-full py-1.5"
          form="checkout-form"
          isValid={isValid}
          pending={pending}
        />
      </div>
    </div>
  );
};

export default Check;

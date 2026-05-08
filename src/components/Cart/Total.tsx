import {
  // Link,
  useNavigate,
} from "react-router";
import type { ICartItem } from "../../../features/cart/interface";
import StyledButton from "../StyledButton";

const Total = ({ data }: { data: ICartItem[] }) => {
  const subtotal =
    data &&
    data.reduce((accumulator: number, p: ICartItem) => {
      return (accumulator += p.price * p.quantity);
    }, 0);

  const formattedSubtotal = subtotal && subtotal.toFixed(2);

  const isValid = data.every((ci) => ci.quantity <= ci.product.amount);

  const navigate = useNavigate();

  return (
    <div className="rounded-sm p-4 bg-(--light-gray) mb-7 text-[12px] lg:bg-transparent lg:w-1/2 ">
      <h5 className="lg:text-[26px]">Cart totals</h5>

      <div className="mt-6 grid grid-cols-[1.4fr_2fr] gap-y-5">
        <p className="uppercase">subtotal</p>
        <p className="text-(--dark-gray)">$ {formattedSubtotal}</p>
        <p className="uppercase">shipping</p>
        <div>
          <p className="text-[12px] text-(--dark-gray)">
            Shipping costs will be calculated once you have provided address.
          </p>

          {/* <div className="join join-vertical text-black">
                      <div className="collapse collapse-arrow join-item  border">
                        <input
                          type="radio"
                          name="my-accordion-4"
                          defaultChecked
                        />
                        <div className="collapse-title font-semibold">
                          How do I create an account?
                        </div>
                        <div className="collapse-content text-sm">
                          Click the "Sign Up" button in the top right corner and
                          follow the registration process.
                        </div>
                      </div>
                    </div> */}
        </div>
      </div>
      <hr className="text-(--gray) mt-8" />
      <span className="mt-4 flex justify-between">
        <p>TOTAL</p>
        <p className="text-(--dark-gray)">$ {formattedSubtotal}</p>
      </span>
      {/* <Link
        to="/checkout"
        className={`uppercase w-full flex justify-center items-center py-2 border border-transparent bg-black text-white mt-4 rounded-sm hover:border-black hover:bg-white hover:text-black focus:border-black focus:bg-white focus:text-black transition-colors duration-200 disabled:opacity-50  `}
      >
        Go to checkout
      </Link> */}
      <StyledButton
        text="Go to checkout"
        extraStyles="py-2 mt-4 w-full uppercase disabled:cursor-not-allowed"
        isValid={isValid}
        btnType="button"
        fn={() => navigate("/checkout")}
      />
    </div>
  );
};

export default Total;

import { useSelector } from "react-redux";
import Section from "../components/Section";
import { userLoggedIn } from "../../features/user/selectors";
import { Link, useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import type { IAddress, IPostAddress } from "../../features/address/interface";
import Check from "../components/Checkout/Check";
import { useCart } from "../hooks/useGetLocalCart";
import type { ICartItem } from "../../features/cart/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearCart, getCart } from "../../features/cart/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../validation";
import { placeOrder } from "../../features/order/requests";
import type { PlaceOrder, IOrder } from "../../features/order/interface";
import BillingComponent from "../components/Checkout/BillingComponent";
import CreateAccount from "../components/Checkout/CreateAccount";
import ShippingComponent from "../components/Checkout/ShippingComponent";
import { addAddress } from "../../features/address/request";
import { useAppDispatch } from "../app/hooks";
import { checkoutSignup } from "../../features/auth/request";
import type { SignupInterface } from "../../features/auth/interface";
import { v4 } from "uuid";
import { tokenSetting } from "../../features/user/slice";
import { getUser } from "../../features/user/operations";
import { setToken } from "../../features/api/api";
// import LinkModal from "../components/Modal/LinkModal";
import { errorToast, successToast } from "../components/toast";
import StyledButton from "../components/StyledButton";

import { loadStripe } from "@stripe/stripe-js";
import { createCheckout } from "../../features/payment/requests";

export type PaymentMethods = "stripe" | "cashOnDelivery" | "checkPayment";
type CheckoutFormValues = {
  billing: IPostAddress;
  shipping?: IPostAddress;
};

const Checkout = () => {
  const isUserLoggedIn = useSelector(userLoggedIn);

  const methods = useForm<CheckoutFormValues>({
    mode: "all",
    resolver: zodResolver(checkoutSchema),
  });

  const [addNewAddress, setNewAddress] = useState(false);
  const [addNewShippingAddress, setNewShippingAddress] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [anotherShippingAddress, setShippingAddress] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const [saveNewAddressBilling, setSaveNewAddressBilling] = useState(false);
  const [saveNewAddressShipping, setSaveNewAddressShipping] = useState(false);

  const [chosenPaymentOption, setPaymentOption] =
    useState<PaymentMethods | null>(null);

  const [selectedBillingAddress, selectBillingAddress] = useState<
    number | null
  >(null);
  const [selectedShippingAddress, selectShippingAddress] = useState<
    number | null
  >(null);

  const [tokenId, setTokenId] = useState<string | null>(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getCart"],
    queryFn: getCart,
    enabled: isUserLoggedIn,
  });

  const { cart, clearCart: clearLocalCart } = useCart();

  const cartData = isUserLoggedIn && !isPending ? data?.items ?? [] : cart;

  const subTotal = cartData
    .reduce((accumulator: number, item: ICartItem) => {
      return (accumulator += item.price * item.quantity);
    }, 0)
    .toFixed(2);

  const navigate = useNavigate();

  const { mutateAsync, isPending: placingOrder } = useMutation({
    mutationKey: ["placeAnOrder"],
    mutationFn: async (data: PlaceOrder) => {
      console.log({ data });
      if (data.paymentMethod === "stripe") {
        const stripe = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

        if (!stripe) {
          console.log("no stripe");
          return;
        }

        const response = await createCheckout(data);
        window.location.href = response.url;
        return;
      } else {
        return placeOrder({ ...data, notes: orderNotes });
      }
    },
    onSuccess(data: IOrder) {
      methods.reset();
      setNewShippingAddress(false);
      setNewAddress(false);
      setShippingAddress(false);
      setCreateAccount(false);
      selectBillingAddress(null);
      selectShippingAddress(null);
      setPaymentOption(null);
      setOrderNotes("");
      setSaveNewAddressBilling(false);
      setSaveNewAddressShipping(false);

      queryClient.invalidateQueries({ queryKey: ["getCart"] });

      if (tokenId) {
        navigate("/set/password?token=" + tokenId);
      }
      successToast("Order is placed");

      if (data.paymentMethod !== "stripe") {
        navigate("/order/success/" + data.id);
      }

      if (isUserLoggedIn) {
        clearCart();
      } else {
        clearLocalCart();
      }
    },
    onError(err) {
      console.log(err);
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
      navigate("/order/failed");
    },
  });

  const { mutateAsync: postAddressFn } = useMutation({
    mutationKey: ["postAddress"],
    mutationFn: (data: IPostAddress) => addAddress(data),
    onSuccess() {
      successToast("Address is added!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { mutateAsync: signupFn } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupInterface) => checkoutSignup(data),
    onSuccess: async (resultData) => {
      setTokenId(resultData.idToResetPassword);
      dispatch(tokenSetting(resultData.token));
      setToken(resultData.token);
      await dispatch(getUser());
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      successToast("Welcome!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = async (submitData: {
    billing: IPostAddress;
    shipping?: IPostAddress;
  }) => {
    try {
      if (!submitData || !chosenPaymentOption) return;

      if (createAccount) {
        // TO-DO: send password by email
        const generatedPassword = v4();
        const newAccount: SignupInterface = {
          firstName: submitData.billing?.firstName,
          lastName: submitData.billing?.lastName,
          email: submitData.billing.email,
          displayName:
            submitData.billing.firstName + " " + submitData.billing.lastName,
          password: generatedPassword,
          confirmPassword: generatedPassword,
        };
        await signupFn(newAccount);
      }

      if (saveNewAddressBilling) {
        const address = submitData.billing;

        await postAddressFn(address);
      }

      if (saveNewAddressShipping && submitData.shipping) {
        const address = submitData.shipping;

        await postAddressFn(address);
      }

      const cartItems = cartData.map((i: ICartItem) => {
        return {
          productId: i.product.id,
          productTitle: i.product.title,
          quantity: i.quantity,
          price: i.price,
        };
      });

      await mutateAsync({
        billingAddress: submitData.billing,
        shippingAddress: submitData.shipping ?? submitData.billing,
        buyerEmail: submitData.billing.email,
        contactNumber: submitData.billing.phone,
        paymentMethod: chosenPaymentOption,
        totalPrice: Number(subTotal),
        items: cartItems,
        notes: orderNotes,
      });
    } catch (err) {
      const error = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      errorToast(error.response?.data?.message || "Something went wrong!");
    }
  };

  const isValid = methods.formState.isValid && !!chosenPaymentOption;

  const handleBillingClick = ({
    address,
    idx,
  }: {
    address: IAddress;
    idx: number;
  }) => {
    setNewAddress(false);

    if (idx !== selectedBillingAddress) {
      methods.setValue("billing", address, {
        shouldValidate: true,
      });
      selectBillingAddress(idx);
    } else {
      methods.resetField("billing");
      selectBillingAddress(null);
    }
  };

  const handleShippingClick = ({
    address,
    idx,
  }: {
    address: IAddress;
    idx: number;
  }) => {
    setNewShippingAddress(false);

    if (idx !== selectedShippingAddress) {
      methods.setValue("shipping", address, {
        shouldValidate: true,
      });
      selectShippingAddress(idx);
    } else {
      methods.unregister("shipping");
      methods.setValue("shipping", undefined, {
        shouldValidate: true,
      });
      methods.resetField("shipping");
      selectShippingAddress(null);
    }
  };

  const checkboxHandle = () => {
    methods.resetField("billing");
    selectBillingAddress(null);
    setNewAddress((prev) => !prev);
  };

  const shippingCheckboxHandle = () => {
    methods.resetField("shipping");
    selectShippingAddress(null);
    setNewShippingAddress((prev) => !prev);
  };

  if (isError) {
    return (
      <Section extraStyles="flex flex-col items-center justify-center gap-4">
        <h5>Error occured!</h5>
        <p>{error.message}</p>
        <StyledButton text="Back" fn={() => navigate("/")} />
      </Section>
    );
  }

  return (
    <>
      <Section extraStyles="text-xs mb-25">
        <h5 className="text-[16px]">Checkout</h5>
        {!isUserLoggedIn && (
          <p className="text-(--dark-gray) mt-6">
            Returning customer?{" "}
            <Link to={"/account/auth"} className="text-black">
              Click here to login
            </Link>
          </p>
        )}

        <div className="flex flex-col gap-10 lg:flex-row mt-6 lg:w-full">
          <FormProvider {...methods}>
            <form
              className={`flex flex-col gap-6  text-[12px] text-(--dark-gray) transition-all transform origin-top lg:w-1/2 `}
              id="checkout-form"
              onSubmit={methods.handleSubmit(handleSubmit)}
            >
              <h5 className="lg:text-[26px] hidden lg:block text-black">
                Billing address
              </h5>

              <BillingComponent
                isUserLoggedIn={isUserLoggedIn}
                addNewAddress={addNewAddress}
                checkboxHandle={checkboxHandle}
                handleBillingClick={handleBillingClick}
                selectedBillingAddress={selectedBillingAddress}
                setSaveNewAddressBilling={setSaveNewAddressBilling}
              />
              <div className="flex flex-col gap-3">
                <CreateAccount
                  isUserLoggedIn={isUserLoggedIn}
                  setCreateAccount={setCreateAccount}
                />

                <label
                  htmlFor="addShippingAddress"
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name=""
                    id="addShippingAddress"
                    onChange={() => {
                      methods.unregister("shipping");
                      selectShippingAddress(null);
                      setShippingAddress(!anotherShippingAddress);
                    }}
                  />
                  <p>Ship to a different address?</p>
                </label>
              </div>
              {anotherShippingAddress && (
                <h5 className="lg:text-[26px] hidden lg:block text-black">
                  Shipping address
                </h5>
              )}
              <ShippingComponent
                isUserLoggedIn={isUserLoggedIn}
                addNewShippingAddress={addNewShippingAddress}
                checkboxHandle={shippingCheckboxHandle}
                handleShippingClick={handleShippingClick}
                selectedShippingAddress={selectedShippingAddress}
                setSaveNewAddressShipping={setSaveNewAddressShipping}
                anotherShippingAddress={anotherShippingAddress}
              />

              <textarea
                name=""
                id=""
                placeholder="order notes"
                className="w-full mt-9 outline-none border-b border-b-(--dark-gray) text-(--dark-gray) text-[12px] resize-none"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              ></textarea>
            </form>
          </FormProvider>

          <Check
            isValid={isValid}
            cartData={cartData}
            subTotal={subTotal}
            setPaymentOption={setPaymentOption}
            pending={placingOrder}
            chosenPaymentMethod={chosenPaymentOption}
          />
        </div>
      </Section>
      {/* <LinkModal link={link} isOpen={isModalOpen} closeModal={closeModal} /> */}
    </>
  );
};

export default Checkout;

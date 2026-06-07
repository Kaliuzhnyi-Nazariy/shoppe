import {
  Menu,
  ShoppingCart,
  SquareArrowRightExit,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Searchbar from "../Searchbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signout } from "../../../features/auth/request";
import { logout } from "../../../features/user/slice";
import { useAppDispatch } from "../../app/hooks";
import { useCart } from "../../hooks/useGetLocalCart";
import { getCart } from "../../../features/cart/requests";
import { useSelector } from "react-redux";
import { userLoggedIn, userRole } from "../../../features/user/selectors";
import type { ICartItem } from "../../../features/cart/interface";
import { getProducts } from "../../../features/products/requests";
import { errorToast, successToast } from "../toast";

const MobHeader = () => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const menuClickFn = () => setMenuOpen((prev) => !prev);
  const isAuthenticated = useSelector(userLoggedIn);

  // const count = useCartCount();

  // console.log(count);

  const { data, isPending: fetchingCart } = useQuery({
    queryKey: ["getCart", isAuthenticated],
    queryFn: getCart,
    enabled: isAuthenticated,
  });

  const { cart } = useCart();

  const products: ICartItem[] =
    isAuthenticated && !fetchingCart && data ? data.items : cart ?? [];

  const activeProducts = products.filter(
    (p: ICartItem) => p.product && !p.product.isArchived,
  );

  const count = activeProducts.reduce((sum, item) => (sum += item.quantity), 0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: signout,
    onSuccess() {
      dispatch(logout());
      menuClickFn();
      // navigate("/");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 0);

      successToast("You are logged out!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const role = useSelector(userRole);

  const [params, setParams] = useSearchParams();

  const searchParam = params.get("search") || "";

  const { data: orderSearchbar = [], isPending: searchPending } = useQuery({
    queryKey: ["searchProduct", searchParam],
    queryFn: () => getProducts({ search: searchParam }),
    enabled: searchParam.length > 0,
  });

  const clickHandle = () => {
    const url = new URLSearchParams(params);
    url.delete("search");
    setParams(url);
    menuClickFn();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams((prev) => {
      const params = new URLSearchParams(prev);

      if (e.target.value.trim().length > 0) {
        params.set("search", e.target.value);
      } else {
        params.delete("search");
      }

      return params;
    });

  return (
    <div className="lg:hidden">
      <button type="button" className="flex" onClick={() => menuClickFn()}>
        {/* {menuIsOpen ? <X className="size-4" /> : <Menu className="w-5 h-4.5" />} */}
        <Menu className="w-5 h-4.5" />
      </button>
      <div
        className={
          "fixed w-full min-h-screen top-0 left-0 transition-transform bg-white duration-150 p-4 z-50 " +
          (menuIsOpen ? " translate-y-0" : " -translate-y-full")
        }
      >
        <div className="w-full flex flex-col gap-2 items-center justify-between">
          <div className="w-full flex items-center justify-between">
            <Link to="/" onClick={menuClickFn}>
              <img src="/SHOPPE.png" alt="shoppe logo" />
            </Link>
            <div className="flex items-center gap-4">
              {role !== "admin" && (
                <Link to="/cart" onClick={menuClickFn} className="relative">
                  {count > 0 && (
                    <div className="absolute top-0 left-full border p-1 rounded-full text-[8px] bg-white flex items-center justify-center -translate-1/2 size-3">
                      {count}
                    </div>
                  )}
                  <ShoppingCart size={18} className="" />
                </Link>
              )}
              <button
                type="button"
                // className="absolute top-5 right-5"
                onClick={menuClickFn}
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <Searchbar
            extraStyles="w-full"
            clickHandle={clickHandle}
            onChange={onChange}
            result={orderSearchbar}
            pending={searchPending}
            value={searchParam}
          />
        </div>

        <ul className="mt-10 flex flex-col gap-6">
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/" className="block w-full">
              Home
            </Link>
          </li>
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/shop" className="block w-full">
              Shop
            </Link>
          </li>
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/about" className="block w-full">
              About
            </Link>
          </li>
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/blog" className="block w-full">
              Blog
            </Link>
          </li>
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/help" className="block w-full">
              Help
            </Link>
          </li>
        </ul>

        <hr className="mt-10" />

        <ul className="mt-6 flex flex-col gap-6">
          <li onClick={() => menuClickFn()} className="w-full">
            <Link
              to="/account/dashboard"
              className="flex items-center gap-2.5 w-full"
            >
              <User className="size-5" />
              <span>My account</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="w-full">
              <button
                type="button"
                onClick={() => mutate()}
                className="flex items-center gap-2.5 w-full text-start cursor-pointer"
              >
                <SquareArrowRightExit className="size-4.5" />
                {isPending ? "Loading..." : "Logout"}
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobHeader;

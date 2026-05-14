import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router";
import MobHeader from "./MobHeader";
// import { useCartCount } from "../../hooks/useGetLocalCart";
import Searchbar from "../Searchbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../../features/cart/requests";
import { useCart } from "../../hooks/useGetLocalCart";
import { useSelector } from "react-redux";
import { userLoggedIn, userRole } from "../../../features/user/selectors";
import type { ICartItem } from "../../../features/cart/interface";
import { getProducts } from "../../../features/products/requests";

const Header = () => {
  const isAuthenticated = useSelector(userLoggedIn);

  // const { data } = useQuery({
  //   queryKey: ["getCart", isAuthenticated],
  //   queryFn: getCart,
  //   enabled: isAuthenticated,
  // });

  // const { cartCount } = useCart();

  // console.log({ isAuthenticated });
  // console.log({ data });

  // const count = isAuthenticated ? data.items.length : cartCount;

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

  const listOfPagesWhereSearchbarIsNotShown = ["/product", "/cart", "/order"];

  const { pathname } = useLocation();

  const isNotShown = listOfPagesWhereSearchbarIsNotShown.some((page) =>
    pathname.startsWith(page),
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const openSearch = () => setIsSearchOpen(true);

  // const closeSearch = () => setIsSearchOpen(true);

  const role = useSelector(userRole);

  const [params, setParams] = useSearchParams();

  const searchParam = params.get("search") || "";

  const { data: orderSearchbar = [], isPending: searchPending } = useQuery({
    queryKey: ["searchProduct", searchParam],
    queryFn: () => getProducts(searchParam),
    enabled: searchParam.length > 0,
  });

  const clickHandle = () => {
    const url = new URLSearchParams(params);
    url.delete("search");
    setParams(url);
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
    <header className="p-4 w-full flex lg:justify-between flex-col lg:flex-row gap-4.5 lg:items-center ">
      <div className="flex items-center w-full justify-between">
        <Link to="/">
          <img src="/SHOPPE.png" alt="shoppe logo" />
        </Link>
        <div className="flex w-full justify-end lg:items-center">
          <ul className="hidden lg:flex gap-16 flex-2 justify-end">
            <li>
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link to={"/blog"}>Blog</Link>
            </li>
            <li>
              <Link to={"/about"}>Our Story</Link>
            </li>
          </ul>

          <span className="hidden lg:block mx-12">{"|"}</span>
          <div className="flex items-center gap-4 lg:gap-10 min-w-0">
            <span className="flex items-center">
              <Searchbar
                extraStyles={`
    hidden lg:flex
    h-8
    origin-right
    transition-all duration-300 ease-in-out
    transform
    ${
      isSearchOpen
        ? "scale-x-100 opacity-100 w-64 mr-4"
        : "scale-x-0 opacity-0 w-0"
    }
  `}
                clickHandle={clickHandle}
                onChange={onChange}
                result={orderSearchbar}
                pending={searchPending}
                value={searchParam}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="size-5 hidden lg:block" />
              </button>
            </span>

            {role !== "admin" && (
              <Link to="/cart" className="relative">
                {count > 0 && (
                  <div className="absolute top-0 left-full border p-1 rounded-full text-[8px] bg-white flex items-center justify-center -translate-1/2 size-3">
                    {count}
                  </div>
                )}
                <ShoppingCart size={18} className="" />
              </Link>
            )}

            <Link to="/account/dashboard">
              <User className="size-5 hidden lg:block" />
            </Link>
            <MobHeader />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        {!isNotShown && (
          <Searchbar
            extraStyles="w-full"
            clickHandle={clickHandle}
            onChange={onChange}
            result={orderSearchbar}
            pending={searchPending}
            value={searchParam}
          />
        )}
      </div>
    </header>
  );
};

export default Header;

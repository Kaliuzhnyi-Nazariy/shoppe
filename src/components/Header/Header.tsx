import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";
import MobHeader from "./MobHeader";
import { useCartCount } from "../../hooks/useGetLocalCart";
import Searchbar from "../Searchbar";
// import { useSelector } from "react-redux";
// import { userLoggedIn } from "../../../features/user/selectors";

const Header = () => {
  // const isUserLoggedIn = useSelector(userLoggedIn);
  const count = useCartCount();

  const listOfPagesWhereSearchbarIsNotShown = ["/product", "/cart"];

  const { pathname } = useLocation();

  const isNotShown = listOfPagesWhereSearchbarIsNotShown.some((page) =>
    pathname.startsWith(page),
  );

  return (
    <header className="p-4 w-full flex  flex-col gap-4.5 ">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="/SHOPPE.png" alt="shoppe logo" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            {count > 0 && (
              <div className="absolute top-0 left-full border p-1 rounded-full text-[8px] bg-white flex items-center justify-center -translate-1/2 size-3">
                {count}
              </div>
            )}
            <ShoppingCart size={18} className="" />
          </Link>

          <MobHeader />
        </div>
      </div>
      {!isNotShown && <Searchbar />}
    </header>
  );
};

export default Header;

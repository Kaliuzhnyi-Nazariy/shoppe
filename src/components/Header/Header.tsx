import {
  // Menu,
  ShoppingCart,
  // X
} from "lucide-react";
// import { useState } from "react";
import { Link } from "react-router";
import MobHeader from "./MobHeader";

const Header = () => {
  // const [menuIsOpen, setMenuOpen] = useState(false);

  // const menuClickFn = () => {
  //   if (menuIsOpen) {
  //     setMenuOpen(false);
  //   } else {
  //     setMenuOpen(true);
  //   }
  // };

  const count = 5;

  return (
    <header className="p-4 w-full flex items-center justify-between">
      <Link to="/">
        <img src="/SHOPPE.png" alt="shoppe logo" />
      </Link>
      <div className="flex items-center gap-4">
        <div className="relative">
          {count > 0 && (
            <div className="absolute top-0 left-full border p-1 rounded-full text-[8px] bg-white flex items-center justify-center -translate-1/2 size-3">
              {count}
            </div>
          )}
          <ShoppingCart size={18} className="" />
        </div>
        {/* <button type="button" onClick={() => menuClickFn()}>
          {menuIsOpen ? (
            <X className="size-4" />
          ) : (
            <Menu className="w-5 h-4.5" />
          )}
        </button> */}
        <MobHeader />
      </div>
    </header>
  );
};

export default Header;

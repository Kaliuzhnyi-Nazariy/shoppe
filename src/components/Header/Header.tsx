import { Outlet } from "react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const menuClickFn = () => {
    if (menuIsOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const count = 5;

  return (
    <div className="p-4 ">
      <div className="flex items-center justify-between">
        <img src="/SHOPPE.png" alt="shoppe logo" />
        <div className="flex items-center gap-4">
          <div className="relative">
            {count > 0 && (
              <div className="absolute top-0 left-full border p-1 rounded-full text-[8px] bg-white flex items-center justify-center -translate-1/2 size-3">
                {count}
              </div>
            )}
            <ShoppingCart size={18} className="" />
          </div>
          <button type="button" onClick={() => menuClickFn()}>
            {menuIsOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="w-5 h-4.5" />
            )}
          </button>
        </div>
      </div>

      <Outlet></Outlet>
    </div>
  );
};

export default Header;

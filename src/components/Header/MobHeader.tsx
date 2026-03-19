import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar";
import { useMutation } from "@tanstack/react-query";
import { signout } from "../../../features/auth/request";
import { logout } from "../../../features/user/slice";
import { useAppDispatch } from "../../app/hooks";

const MobHeader = () => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const menuClickFn = () => setMenuOpen((prev) => !prev);

  const count = 5;

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
    },
  });

  return (
    <div>
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
              <button
                type="button"
                // className="absolute top-5 right-5"
                onClick={menuClickFn}
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <Searchbar />
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
        </ul>

        <hr className="mt-10" />

        <ul className="mt-6 flex flex-col gap-6">
          <li onClick={() => menuClickFn()} className="w-full">
            <Link to="/account/dashboard" className="block w-full">
              My account
            </Link>
          </li>
          <li className="w-full">
            <button
              type="button"
              onClick={() => mutate()}
              className="w-full text-start cursor-pointer"
            >
              {isPending ? "Loading..." : "Logout"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobHeader;

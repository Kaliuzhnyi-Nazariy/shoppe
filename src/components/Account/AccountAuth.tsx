import { useState } from "react";
// import Section from "../Section";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AccountAuth = () => {
  const [auth, setAuth] = useState<"signin" | "register">("signin");

  return (
    <div className="w-72">
      <div className="w-[288px] h-8 rounded-[5px] bg-gray-400 p-0.5 relative mt-6">
        <div
          className={
            "absolute w-35.5 rounded-[5px] bg-white h-7 transition-transform duration-200 " +
            (auth === "signin" ? "" : "translate-x-full")
          }
        ></div>
        <ul className="flex">
          <li
            className={
              "w-1/2 flex items-center justify-center z-10 "
              // +
              // (auth == "signin" && "bg-white")
            }
            onClick={() => setAuth("signin")}
          >
            sign in
          </li>
          <li
            className={
              "w-1/2 flex items-center justify-center z-10 "
              // +
              // (auth == "register" && "bg-white")
            }
            onClick={() => {
              setAuth("register");
            }}
          >
            Register
          </li>
        </ul>
      </div>

      {auth === "register" ? <SignupForm /> : <SigninForm />}
    </div>
    // <Section extraStyles="mt-6 flex flex-col items-center mb-20.5">
    //   <h3>My account</h3>

    /* <ul className="w-full h-8 rounded-[5px] bg-gray-400 p-0.5 flex">
        <li
          className={
            "w-1/2 flex items-center justify-center rounded-[5px] " +
            (auth == "signin" && "bg-white")
          }
          onClick={() => setAuth("signin")}
        >
          sign in
        </li>
        <li
          className={
            "w-1/2 flex items-center justify-center rounded-[5px] " +
            (auth == "register" && "bg-white")
          }
          onClick={() => {
            setAuth("register");
          }}
        >
          Register
        </li>
      </ul> */

    // </Section>
  );
};

export default AccountAuth;

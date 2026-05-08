const FormSwitcher = ({
  auth = "signin",
  setAuth,
}: {
  auth: "signin" | "register";
  setAuth: (value: "signin" | "register") => void;
}) => {
  return (
    <div className="h-8 lg:h-15 rounded-[5px] bg-(--light-gray) p-0.5 lg:p-1.5 relative mt-6 text-xs lg:text-xl">
      <div className={"absolute inset-0 p-0.5 lg:p-1.5 pointer-events-none"}>
        <div
          className={
            "w-1/2 h-full rounded-[5px] bg-white transition-transform duration-200 " +
            (auth === "signin" ? "translate-x-0" : "translate-x-full")
          }
        />
      </div>

      <ul className="flex items-center justify-around h-full uppercase relative z-10">
        <li
          className="w-1/2 flex items-center justify-center"
          onClick={() => setAuth("signin")}
        >
          sign in
        </li>
        <li
          className="w-1/2 flex items-center justify-center"
          onClick={() => setAuth("register")}
        >
          register
        </li>
      </ul>
    </div>
  );
};

export default FormSwitcher;

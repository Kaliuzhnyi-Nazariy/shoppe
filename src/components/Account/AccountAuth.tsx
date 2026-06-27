import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import FormSwitcher from "./FormSwitcher";

const AccountAuth = () => {
  const [auth, setAuth] = useState<"signin" | "register">("signin");

  return (
    <div className="w-full max-w-125">
      <FormSwitcher auth={auth} setAuth={setAuth} />

      {auth === "register" ? <SignupForm /> : <SigninForm />}
    </div>
  );
};

export default AccountAuth;

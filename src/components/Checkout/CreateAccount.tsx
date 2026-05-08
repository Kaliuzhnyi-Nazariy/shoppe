import React from "react";

const CreateAccount = ({
  isUserLoggedIn,
  setCreateAccount,
}: {
  isUserLoggedIn: boolean;
  setCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {!isUserLoggedIn && (
        <label htmlFor="createAnAccount" className="flex items-center gap-2">
          <input
            type="checkbox"
            name=""
            id="createAnAccount"
            onClick={() => setCreateAccount((prev) => !prev)}
          />
          <p>Create an acoount?</p>
        </label>
      )}
    </>
  );
};

export default CreateAccount;

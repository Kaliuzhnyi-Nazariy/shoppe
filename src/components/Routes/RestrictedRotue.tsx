import { useSelector } from "react-redux";
import { userLoading, userLoggedIn } from "../../../features/user/selectors";
import { Navigate, Outlet } from "react-router-dom";

// const RestrictedRotue = () => {
//   const isUserLoggedIn = useSelector(userLoggedIn);
//   const isUserLoading = useSelector(userLoading);

//   console.log({ isUserLoading, isUserLoggedIn });

//   if (isUserLoggedIn) {
//     return <Navigate to="/account/dashboard" replace />;
//   } else if (!isUserLoggedIn && isUserLoading) {
//     return <div className="">Loading...</div>;
//   }
//   return <Outlet />;
// };

// export default RestrictedRotue;

const RestrictedRotue = () => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserLoading = useSelector(userLoading);

  // 1. loading first
  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  // 2. already logged in → block access
  if (isUserLoggedIn) {
    return <Navigate to="/account/dashboard" replace />;
  }

  // 3. allow access
  return <Outlet />;
};

export default RestrictedRotue;

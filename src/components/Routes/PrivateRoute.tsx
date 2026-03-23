import { useSelector } from "react-redux";
import {
  userLoading,
  userLoggedIn,
  userRole,
} from "../../../features/user/selectors";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
//   const role = useSelector(userRole);
//   const isUserLoggedIn = useSelector(userLoggedIn);
//   const isUserLoading = useSelector(userLoading);

//   console.log({ isUserLoading, isUserLoggedIn });

//   if (!isUserLoggedIn && isUserLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isUserLoggedIn && !isUserLoading && allowedRoles.includes(role!)) {
//     return <Outlet />;
//   }

//   console.log("second: ", { isUserLoading, isUserLoggedIn });

//   return <Navigate to="/account/auth" replace />;
// };

// export default PrivateRoute;

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = useSelector(userRole);
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserLoading = useSelector(userLoading);

  const location = useLocation();

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!isUserLoggedIn && isUserLoading) {
    return <Navigate to="/account/auth" state={{ from: location.pathname }} />;
  }

  if (!isUserLoggedIn && !allowedRoles.includes(role!)) {
    return <Navigate to="/account/auth" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

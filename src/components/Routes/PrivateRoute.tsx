import { useSelector } from "react-redux";
import {
  userLoading,
  userLoggedIn,
  userRole,
} from "../../../features/user/selectors";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = useSelector(userRole);
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserLoading = useSelector(userLoading);

  const location = useLocation();

  if (isUserLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <OrbitProgress color="var(--gray)" size="small" />
      </div>
    );
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

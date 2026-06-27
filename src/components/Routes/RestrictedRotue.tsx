import { useSelector } from "react-redux";
import { userLoading, userLoggedIn } from "../../../features/user/selectors";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

const RestrictedRotue = () => {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const isUserLoading = useSelector(userLoading);

  const location = useLocation();

  // 1. loading first
  if (isUserLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <OrbitProgress color="var(--gray)" size="small" />
      </div>
    );
  }

  // 2. already logged in → block access
  if (isUserLoggedIn) {
    return <Navigate to={location?.state?.from || "/account/dashboard"} />;
  }

  // 3. allow access
  return <Outlet />;
};

export default RestrictedRotue;

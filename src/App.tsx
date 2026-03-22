import {
  Route,
  Routes,
  // useLocation
} from "react-router-dom";

// import "keen-slider/keen-slider.min.css";
// import "./index.css";

// import ProductList from "./components/Product/ProductList";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getUser } from "../features/user/operations";
// import Searchbar from "./components/Searchbar";
// import Slider from "./components/Slider";
// import Product from "./components/Product/Product";
import HeaderAndFooter from "./Layout/HeaderAndFooter";
import PrivateRoute from "./components/Routes/PrivateRoute";
import RestrictedRotue from "./components/Routes/RestrictedRotue";

const AccountPage = lazy(() => import("./pages/Account"));
const LayoutForMenu = lazy(
  () => import("./components/Header/Menu/MobileDashboardMenu"),
);
const DashboardAccountPage = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardOrdersPage = lazy(() => import("./pages/Dashboard/Orders"));
const DashboardAddressesPage = lazy(
  () => import("./pages/Dashboard/Addresses"),
);
const DashboardDownloadsPage = lazy(
  () => import("./pages/Dashboard/Downloads"),
);
const DashboardAccountDetailsPage = lazy(
  () => import("./pages/Dashboard/AccountDetails"),
);
const ShopPage = lazy(() => import("./pages/Shop"));
const ProductsPage = lazy(() => import("./pages/Product"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const CartPage = lazy(() => import("./pages/Cart"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<HeaderAndFooter />}>
          <Route
            path="/"
            element={
              <div className="bg-(--accent)">
                <h1 className="text-(--dark-gray)">Test</h1>
                <p>hello</p>
              </div>
            }
          />
          <Route path="/account">
            <Route element={<RestrictedRotue />}>
              <Route path="auth" element={<AccountPage />} />
            </Route>
            {/* <Route
              element={<PrivateRoute allowedRoles={["customer", "admin"]} />}
            >
              <Route path="dashboard" element={<DashboardAccountPage />} />
            </Route>
          </Route> */}
            <Route
              element={<PrivateRoute allowedRoles={["customer", "admin"]} />}
            >
              <Route element={<LayoutForMenu />}>
                <Route path="dashboard" element={<DashboardAccountPage />} />
                <Route
                  path="dashboard/orders"
                  element={<DashboardOrdersPage />}
                />
                <Route
                  path="dashboard/downloads"
                  element={<DashboardDownloadsPage />}
                />
                <Route
                  path="dashboard/addresses"
                  element={<DashboardAddressesPage />}
                />
                <Route
                  path="dashboard/details"
                  element={<DashboardAccountDetailsPage />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

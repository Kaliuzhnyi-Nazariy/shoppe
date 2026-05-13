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
// import { getUser } from "../features/user/operations";
// import Searchbar from "./components/Searchbar";
// import Slider from "./components/Slider";
// import Product from "./components/Product/Product";
import HeaderAndFooter from "./Layout/HeaderAndFooter";
import PrivateRoute from "./components/Routes/PrivateRoute";
import RestrictedRotue from "./components/Routes/RestrictedRotue";
import { refreshUser } from "../features/user/operations";
import Home from "./pages/Home";

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
const CreateProductPage = lazy(() => import("./pages/CreateProduct"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const UpdateProductPage = lazy(() => import("./pages/UpdateProduct"));

const CartPage = lazy(() => import("./pages/Cart"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const SetPasswordPage = lazy(() => import("./pages/SetPassword"));
const ForgetPage = lazy(() => import("./pages/ForgetPassword"));

const TrackOrderPage = lazy(() => import("./pages/TrackOrder"));

const LogoutPage = lazy(() => import("./pages/Logout"));
// const SearchOrderPage = lazy(() => import("./pages/SearchOrder"));
const HelpPage = lazy(() => import("./pages/Help/Help"));
const TermsPage = lazy(() => import("./pages/Help/Terms"));
const PolicyPage = lazy(() => import("./pages/Help/Privacy"));

const AboutPage = lazy(() => import("./pages/About"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<HeaderAndFooter />}>
          <Route path="/" element={<Home />} />
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
                <Route path="dashboard/logout" element={<LogoutPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductsPage />} />
          {/* <Route
            element={<PrivateRoute allowedRoles={["customer", "admin"]} />}
          >
            <Route path="/cart" element={<CartPage />} />
            </Route> */}
          {/* <Route path="/order/search" element={<SearchOrderPage />} /> */}
          <Route path="/order/track" element={<TrackOrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/set/password" element={<SetPasswordPage />} />
          <Route path="/forget" element={<ForgetPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PolicyPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/product/create" element={<CreateProductPage />} />
            <Route path="/product/update/*" element={<UpdateProductPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

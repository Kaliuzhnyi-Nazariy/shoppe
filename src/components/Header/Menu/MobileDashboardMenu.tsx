import { Outlet, useLocation } from "react-router";
import Section from "../../Section";
import Slider from "./Slider";

const MobileDashboardMenu = () => {
  const location = useLocation();

  const isOnDashboardPage = location.pathname === "/account/dashboard";

  return (
    <Section>
      <div className="flex flex-col items-center w-full">
        {isOnDashboardPage && (
          <p className="text-xl mt-10 min-[1024px]:text-[33px] min-[1024px]:font-semibold min-[1440px]:mt-0">
            My account
          </p>
        )}
        <Slider
          extraStyles={
            isOnDashboardPage
              ? "mt-6 min-[1024px]:mt-16"
              : "mt-15 min-[1024px]:"
          }
        />
      </div>

      <Outlet />
    </Section>
  );
};

export default MobileDashboardMenu;

import { Outlet, useLocation } from "react-router";
import Section from "../../Section";
import Slider from "./Slider";

const MobileDashboardMenu = () => {
  const location = useLocation();

  const isOnDashboardPage = location.pathname === "/account/dashboard";

  return (
    <Section>
      <div className="flex flex-col items-center w-full">
        {isOnDashboardPage && <p className="text-xl mt-10">My account</p>}
        <Slider extraStyles={isOnDashboardPage ? "mt-6" : "mt-15"} />
      </div>

      <Outlet />
    </Section>
  );
};

export default MobileDashboardMenu;

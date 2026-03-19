import { Link } from "react-router";
import Searchbar from "../components/Searchbar";
import Section from "../components/Section";

const NotFound = () => {
  return (
    <Section extraStyles="min-h-screen flex flex-col">
      <div className="pt-3 flex items-center flex-col gap-3">
        <Link to={"/"}>
          <img src="/SHOPPE.png" alt="shoppe logo" className="w-25" />
        </Link>
        <Searchbar />
      </div>
      <div className="flex-1 w-41 flex flex-col items-center justify-center mx-auto">
        <h4 className="text-xl font-bold uppercase ">404 ERROR</h4>
        <div className="text-cetner  mt-3 text-[12px]">
          <p className="text-center">This page not found;</p>
          <p>back to home and start again</p>
        </div>
        <Link
          to={"/"}
          className="mt-6 uppercase border rounded-sm py-1.5 px-6.25"
        >
          HOMEPAGE
        </Link>
      </div>
    </Section>
  );
};

export default NotFound;

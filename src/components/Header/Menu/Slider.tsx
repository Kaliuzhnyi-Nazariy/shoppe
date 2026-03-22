import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Arrow } from "./MobileHeaderMenuArrow";
// import { Outlet } from "react-router";
import "./styles.css";
import { Link, useLocation } from "react-router";
// import Section from "../../Section";

const Slider = ({ extraStyles = "" }: { extraStyles?: string }) => {
  const [, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    slides: {
      perView: "auto",
      spacing: 24,
    },
  });

  const [chosenPage, setChosenPage] = useState(0);

  const routes = [
    "/account/dashboard",
    "/account/dashboard/orders",
    "/account/dashboard/downloads",
    "/account/dashboard/addresses",
    "/account/dashboard/details",
  ];

  const { pathname } = useLocation();

  // const chosenPage = routes.findIndex((page) => {
  //   return pathname.startsWith(page);
  // });

  // console.log(index);

  useEffect(() => {
    // console.log({ pathname });

    const index = routes.findIndex((page) => {
      return pathname == page;
    });

    // console.log(index);

    setChosenPage(index);
  }, [pathname, routes]);

  // console.log({ chosenPage });

  const getSlideClass = (index: number) =>
    "keen-slider__slide flex items-center justify-center text-center border-b shrink-0 h-full " +
    (index === chosenPage
      ? "opacity-100 border-b-black"
      : "opacity-50 border-b-transparent");

  return (
    <>
      <div className={"relative w-full h-11 mb-10 " + extraStyles}>
        <div className="overflow-hidden px-7 h-full">
          <div ref={sliderRef} className="keen-slider h-full">
            {/* <Link
              to={"/account/dashboard"}
              className={getSlideClass(0)}
              // onClick={() => setChosenPage(0)}
            >
              Dashboard
            </Link> */}
            <Link to="/account/dashboard" className={getSlideClass(0)}>
              Dashboard
            </Link>
            <Link
              to="/account/dashboard/orders"
              className={getSlideClass(1)}
              // onClick={() => setChosenPage(1)}
            >
              Orders
            </Link>
            <Link
              to="/account/dashboard/downloads"
              className={getSlideClass(2)}
              // onClick={() => setChosenPage(2)}
            >
              Downloads
            </Link>
            <Link
              to="/account/dashboard/addresses"
              className={getSlideClass(3)}
              // onClick={() => setChosenPage(3)}
            >
              Addresses
            </Link>
            <Link
              to="/account/dashboard/details"
              className={getSlideClass(4)}
              // onClick={() => setChosenPage(4)}
            >
              Account Details
            </Link>
          </div>
        </div>

        {loaded && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            />

            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            />
          </>
        )}
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default Slider;

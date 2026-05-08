// import { useKeenSlider } from "keen-slider/react";
// import React, { useState } from "react";
// import "keen-slider/keen-slider.min.css";
// import "./styles.css";

// const PhotoAccordion = ({
//   images,
//   isOutOfStock = false,
// }: {
//   images: string[];
//   isOutOfStock?: boolean;
// }) => {
//   const [slidesCount, setSlidesCount] = useState(0);

//   const [currentSlide, setCurrentSlide] = React.useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
//     initial: 0,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created(slider) {
//       setLoaded(true);
//       setSlidesCount(slider.track.details.slides.length);
//     },
//     slides: {
//       perView: 1,
//     },
//   });

//   return (
//     <>
//       <div className="navigation-wrapper flex relative">
//         <div ref={sliderRef} className="keen-slider relative">
//           {images.map((i) => {
//             return (
//               <div
//                 className="keen-slider__slide h-93.5 flex items-center justify-center"
//                 key={i}
//               >
//                 <img
//                   className=" max-w-full max-h-full object-contain min-[1440px]:max-w-135"
//                   src={i}
//                   key={i}
//                 />

//                 {isOutOfStock && (
//                   <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
//                     out of stock
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//         {loaded && (
//           <>
//             <Arrow
//               left
//               onClick={(e: React.MouseEvent<SVGSVGElement>) => {
//                 e.stopPropagation();
//                 instanceRef.current?.prev();
//               }}
//               disabled={currentSlide === 0}
//             />

//             <Arrow
//               onClick={(e) => {
//                 e.stopPropagation();
//                 instanceRef.current?.next();
//               }}
//               disabled={currentSlide === slidesCount - 1}
//             />
//           </>
//         )}
//       </div>
//       {loaded && slidesCount > 0 && (
//         <div className="progress-bar">
//           <div className="segments">
//             {[...Array(slidesCount).keys()].map((idx) => (
//               <div
//                 key={idx}
//                 className="segment"
//                 onClick={() => instanceRef.current?.moveToIdx(idx)}
//               />
//             ))}
//           </div>

//           <div
//             className="indicator"
//             style={{
//               width: `${100 / slidesCount}%`,
//               transform: `translateX(${currentSlide * 100}%)`,
//             }}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// function Arrow(props: {
//   disabled: boolean;
//   left?: boolean;
//   onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
// }) {
//   const disabled = props.disabled ? " arrow--disabled" : "";
//   return (
//     <svg
//       onClick={props.onClick}
//       className={`arrow ${
//         props.left ? "arrow--left" : "arrow--right"
//       } ${disabled}`}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//     >
//       {props.left && (
//         <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
//       )}
//       {!props.left && (
//         <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
//       )}
//     </svg>
//   );
// }

// export default PhotoAccordion;

import {
  useKeenSlider,
  type KeenSliderInstance,
  type KeenSliderPlugin,
} from "keen-slider/react";
import React, { useState, type RefObject } from "react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";

function ThumbnailPlugin(
  mainRef: RefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const PhotoAccordion = ({
  images,
  isOutOfStock = false,
}: {
  images: string[];
  isOutOfStock?: boolean;
}) => {
  const [slidesCount, setSlidesCount] = useState(0);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setLoaded(true);
      setSlidesCount(slider.track.details.slides.length);
    },
    slides: {
      perView: 1,
    },
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      vertical: true,
      initial: 0,
      slides: {
        perView: 4,
        spacing: 40,

        // number: slidesCount,
      },
      breakpoints: {
        "(max-width: 1439px)": {
          disabled: true,
          vertical: true,
        },
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  return (
    <div className="min-[1440px]:flex min-[1440px]:flex-row-reverse min-[1440px]:h-150 gap-10">
      <div className="navigation-wrapper flex flex-col relative overflow-hidden min-[1440px]:w-135 ">
        <div ref={sliderRef} className="keen-slider relative">
          {images.map((i) => {
            return (
              <div
                className="keen-slider__slide h-93.5 min-[1440px]:max-w-135! min-[1440px]:min-w-135! min-[1440px]:h-150"
                key={i}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    className=" max-w-full max-h-full object-contain  "
                    src={i}
                    key={i}
                  />
                </div>

                {isOutOfStock && (
                  <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
                    out of stock
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {loaded && (
          <>
            <Arrow
              left
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
              extraStyles="min-[1440px]:hidden"
            />

            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={currentSlide === slidesCount - 1}
              extraStyles="min-[1440px]:hidden"
            />
          </>
        )}

        {loaded && slidesCount > 0 && (
          <div className="progress-bar">
            <div className="segments">
              {[...Array(slidesCount).keys()].map((idx) => (
                <div
                  key={idx}
                  className="segment"
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                />
              ))}
            </div>

            <div
              className="indicator"
              style={{
                width: `${100 / slidesCount}%`,
                transform: `translateX(${currentSlide * 100}%)`,
              }}
            />
          </div>
        )}
      </div>
      <div
        ref={thumbnailRef}
        className="hidden min-[1440px]:flex min-[1440px]:flex-col keen-slider thumbnail flex-nowrap! max-w-30 min-h-0"
      >
        {images.map((i) => {
          return (
            <div
              className="keen-slider__slide max-w-30! min-h-30! max-h-30! flex items-center justify-center"
              key={i}
            >
              <img
                className=" max-w-full max-h-full object-contain"
                src={i}
                key={i}
              />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  extraStyles: string;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled} ${props.extraStyles && props.extraStyles}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default PhotoAccordion;

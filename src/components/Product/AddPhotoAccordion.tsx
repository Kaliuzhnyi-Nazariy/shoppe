import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

const AddPhotoAccordion = ({
  images,
  isOutOfStock = false,
  clickHandle,
  onFilesChange,
}: {
  images: { id: string; link: string }[];
  // images: string[];
  isOutOfStock?: boolean;
  clickHandle?: ({ id, link }: { id: string; link: string }) => void;
  // clickHandle?: ({ id }: { id: string }) => void;
  onFilesChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // console.log({ images });
  const [slidesCount, setSlidesCount] = useState(0);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      const count = slider.track.details.slides.length;
      setSlidesCount(count);
      setLoaded(true);
    },
    updated(slider) {
      const count = slider.track.details.slides.length;
      setSlidesCount(count);
      setCurrentSlide(0);
      setLoaded(true);
    },
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
      instanceRef.current.moveToIdx(0);
    }
  }, [images, instanceRef]);

  const { register } = useFormContext();

  const isMax = images.length >= 10;

  return (
    <div className="col-start-1">
      <div className="navigation-wrapper">
        <div
          ref={sliderRef}
          className=" keen-slider relative min-h-80 lg:min-h-110 "
          key={images.length}
        >
          {images.map((i) => (
            <div
              key={`${i.id}`}
              className="keen-slider__slide flex items-center justify-center min-[1440px]:max-h-100"
            >
              <img
                src={i.link}
                className="max-w-full max-h-full object-contain"
              />
              {isOutOfStock && (
                <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
                  out of stock
                </span>
              )}

              <button
                type="button"
                className="absolute top-8 right-1 p-1 bg-white/50 rounded-2xl text-xs"
                onClick={() => {
                  if (clickHandle) {
                    clickHandle({ id: i.id, link: i.link });
                  }
                }}
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {!isMax && (
            <div
              key="upload"
              className="keen-slider__slide flex items-center justify-center h-80 w-full! min-[1024px]:w-125 min-[1024px]:h-110 min-[1440px]:w-150 max-w-247.75"
            >
              <label
                htmlFor="photos"
                className="w-full! h-80 min-[1024px]:min-w-125! min-[1024px]:h-110 min-[1440px]:min-w-150! border border-dashed border-(--dark-gray) rounded-sm flex flex-col items-center justify-center max-w-247.75"
              >
                <p>Add photos (max 10 files)</p>
                <p>(optional)</p>
              </label>

              <input
                type="file"
                hidden
                id="photos"
                accept="image/jpeg,image/png"
                multiple
                max={10}
                {...register("photos", { onChange: onFilesChange })}
                onChange={onFilesChange}
              />
            </div>
          )}
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
            />

            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={currentSlide === slidesCount - 1}
            />
          </>
        )}
      </div>
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
              left: `${(currentSlide * 100) / slidesCount}%`,
            }}
          />
        </div>
      )}
      {/* </div > */}
    </div>
  );
};

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
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

export default AddPhotoAccordion;

//  <div ref={sliderRef} className="keen-slider relative">
//           {/* {slides.map((i) => {
//             if (i === "UPLOAD") {
//               return (
//                 <div
//                   key="upload"
//                   className="keen-slider__slide flex items-center justify-center"
//                 >
//                   <p className="absolute">{i}</p>
//                   <label
//                     htmlFor="photos"
//                     className="w-full h-80 border border-dashed border-(--dark-gray) rounded-sm flex flex-col items-center justify-center"
//                   >
//                     <p>Add photos (max 10 files)</p>
//                     <p>(optional)</p>
//                   </label>

//                   <input
//                     type="file"
//                     hidden
//                     id="photos"
//                     accept="image/jpeg,image/png"
//                     multiple
//                     {...register("photos")}
//                   />
//                 </div>
//               );
//             } else {
//               return (
//                 <div
//                   className="keen-slider__slide flex items-center justify-center h-93.5 relative"
//                   key={i}
//                 >
//                   <p className="absolute">{i}</p>

//                   <img
//                     className=" max-w-full max-h-full object-contain"
//                     src={i}
//                     key={i}
//                     onClick={() => {
//                       if (clickHandle) {
//                         clickHandle(i);
//                       }
//                     }}
//                     onLoad={() => instanceRef.current?.update()}
//                   />

//                   {isOutOfStock && (
//                     <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
//                       out of stock
//                     </span>
//                   )}
//                 </div>
//                 // <div className="keen-slider__slide relative">
//                 //   <img
//                 //     className=" w-full h-93.5 object-contain"
//                 //     src={i}
//                 //     key={i}
//                 //     onClick={() => {
//                 //       if (clickHandle) {
//                 //         clickHandle(i);
//                 //       }
//                 //     }}
//                 //   />

//   {isOutOfStock && (
//     <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
//       out of stock
//     </span>
//   )}
//                 // </div>
//               );
//             }
//           })} */}
//           {images.map((i, idx) => {
//             return (
//               <div
//                 className="keen-slider__slide flex items-center justify-center h-93.5 relative"
//                 // key={`${i}-${idx}`}
//                 key={images.length}
//               >
//                 <img
//                   className=" max-w-full max-h-full object-contain"
//                   src={i}
//                   key={`${i}-${idx}`}
//                   onClick={() => {
//                     if (clickHandle) {
//                       clickHandle(i);
//                     }
//                   }}
//                   onLoad={() => instanceRef.current?.update()}
//                 />

//                 {isOutOfStock && (
//                   <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
//                     out of stock
//                   </span>
//                 )}
//               </div>

//               // <div className="keen-slider__slide relative">
//               //   <img
//               //     className=" w-full h-93.5 object-contain"
//               //     src={i}
//               //     key={i}
//               //     onClick={() => {
//               //       if (clickHandle) {
//               //         clickHandle(i);
//               //       }
//               //     }}
//               //   />

//               //   {isOutOfStock && (
//               //     <span className="uppercase px-3 py-1.5 absolute bg-white/50 rounded-2xl top-1 left-1 text-xs">
//               //       out of stock
//               //     </span>
//               //   )}
//               // </div>
//             );
//           })}

//           {!isMax && (
//             <div
//               key="upload"
//               className="keen-slider__slide flex items-center justify-center"
//             >
//               <label
//                 htmlFor="photos"
//                 className="w-full h-80 border border-dashed border-(--dark-gray) rounded-sm flex flex-col items-center justify-center"
//               >
//                 <p>Add photos (max 10 files)</p>
//                 <p>(optional)</p>
//               </label>

//               <input
//                 type="file"
//                 hidden
//                 id="photos"
//                 accept="image/jpeg,image/png"
//                 multiple
//                 {...register("photos")}
//               />
//             </div>
//           )}

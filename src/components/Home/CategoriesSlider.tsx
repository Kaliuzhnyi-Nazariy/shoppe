import { useKeenSlider } from "keen-slider/react";

const CategoriesSlider = ({ isPending }: { isPending: boolean }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: "auto",
      spacing: 8,
      origin: "auto",
    },
    // loop: true,
    mode: "free",
    breakpoints: {
      "(min-width: 1024px)": {
        disabled: true,
      },
    },
  });

  const categories = ["Earring", "Necklace", "Rings", "Others"];

  //   return (
  //     <div ref={ref} className="keen-slider flex text-xs">
  //       {categories.map((c, idx) => {
  //         return (
  //           <div
  //             className="keen-slider__slide min-w-35 h-10 border border-(--light-gray) rounded-sm flex items-center justify-center"
  //             key={idx}
  //           >
  //             {c}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );

  return (
    <div
      ref={ref}
      className={
        "keen-slider text-xs min-[1024px]:hidden " + isPending && "hidden"
      }
    >
      {categories.map((c, idx) => (
        <div
          key={idx}
          className="keen-slider__slide min-w-35! px-4 h-10 border border-(--light-gray) rounded-sm flex items-center justify-center"
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default CategoriesSlider;

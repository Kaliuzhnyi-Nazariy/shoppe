import { useKeenSlider } from "keen-slider/react";
// import { useState } from "react";
import type { Categories } from "../../../features/products/interface";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getProducts,
//   getProductsByCategory,
// } from "../../../features/products/requests";

const CategoriesSlider = ({
  isPending = false,
  chosenCategory,
  choseCategory,
}: {
  isPending: boolean;
  chosenCategory: Categories | null;
  choseCategory: (category: Categories) => void;
}) => {
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

  const categories = [
    "ELECTRONICS",
    "GAMING",
    "HOME",
    "OTHER",
    "JEWELRY",
    "BOOKS",
    "FOOD",
  ] as const;

  return (
    <div
      ref={ref}
      className={
        "keen-slider text-xs min-[1024px]:hidden " + (isPending && "hidden")
      }
    >
      {categories.map((c, idx) => (
        <div
          key={idx}
          onClick={() => choseCategory(c)}
          className={
            "keen-slider__slide min-w-35! px-4 h-10 border rounded-sm flex items-center justify-center transition-colors duration-200 " +
            (chosenCategory === c
              ? "border-(--accent) text-(--accent) "
              : "border-(--light-gray)")
          }
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default CategoriesSlider;

import { ArrowRight, Share2 } from "lucide-react";
import { AccordionUsage } from "./Accordion";
// import { useLocation } from "react-router";

const Product = () => {
  //   const link = useLocation();

  const link = window.location.href;

  const shareProduct = () => {
    console.log(link);
    navigator.clipboard.writeText(link);
  };

  return (
    <div>
      <div className="">
        <div className="bg-pink-400 w-full h-93.5"></div>
        <div className="mt-4 h-px bg-black"></div>
      </div>
      <div className="flex justify-between mt-6 items-end">
        <div>
          <p className="text-[20px] ">product title</p>
          <p className="text-[16px] mt-1.25">$ 25,00</p>
        </div>

        <div className="pb-2">
          <button type="button" onClick={shareProduct}>
            <Share2 className="size-3.5" />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="w-full border rounded-sm uppercase py-1.5 mt-8"
      >
        add to cart
      </button>
      <article className="h-10 overflow-hidden text-ellipsis text-[12px] text-wrap mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit vero
        quisquam labore reiciendis quas eos facilis, sapiente consectetur minus
        ullam commodi neque sed qui aliquam veniam suscipit ipsum, aut sunt?
      </article>
      <p className="mt-1.5">View more</p>
      <div className="w-full h-px bg-gray mt-4"></div>
      <AccordionUsage />

      <div className="flex items-center justify-between w-full mt-9">
        <p>Continue Shopping</p>
        <ArrowRight className="size-4" />
      </div>
    </div>
  );
};

export default Product;

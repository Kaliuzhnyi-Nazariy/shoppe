import type { IProduct } from "../../../features/products/interface";
import PhotoAccordion from "./PhotoAccordion";

const ProductPhoto = ({
  data,
  images,
}: {
  data: IProduct;
  images: string[];
}) => {
  return (
    <>
      {data.photos.length !== 0 ? (
        <div className="min-[1440px]:flex-3">
          {/* <div className="min-[1440px]:w-3/5 min-[1440px]:flex-1"> */}
          <PhotoAccordion images={images} isOutOfStock={data.amount === 0} />
        </div>
      ) : (
        <div className="min-[1440px]:flex-3">
          <div className="bg-pink-400 w-full h-93.5"></div>
          {/* <div className="bg-pink-400 w-full min-[1440px]:w-3/5 h-93.5"></div> */}
          <div className="mt-4 h-px bg-black"></div>
        </div>
      )}
    </>
  );
};

export default ProductPhoto;

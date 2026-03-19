import { Link } from "react-router";
import type { IProduct } from "../../../features/products/interface";

const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <Link to={"/product/" + product.id} className="rounded-sm">
      {/* <img src="" alt={title} /> */}
      <div className="size-34 rounded-sm bg-purple-500"></div>
      <p className="text-[14px] mt-1.5">{product.title}</p>
      <p className="mt-1 text-primary">
        <span>$ </span>
        {product.price}
      </p>
    </Link>
  );
};

export default ProductItem;

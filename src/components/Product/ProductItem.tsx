// import { Link } from "react-router";

const ProductItem = ({
  product,
}: {
  product: { title: string; price: number };
}) => {
  return (
    <div className="rounded-sm">
      {/* <img src="" alt={title} /> */}
      <div className="size-34 rounded-sm bg-purple-500"></div>
      <p className="text-[14px] mt-1.5">{product.title}</p>
      <p className="mt-1 text-primary">
        <span>$ </span>
        {product.price}
      </p>
    </div>
    // <Link to={"/product"} className="rounded-sm">
    //   {/* <img src="" alt={title} /> */}
    //   <div className="size-34 rounded-sm bg-purple-500"></div>
    //   <p className="text-[14px] mt-1.5">{product.title}</p>
    //   <p className="mt-1 text-primary">
    //     <span>$ </span>
    //     {product.price}
    //   </p>
    // </Link>
  );
};

export default ProductItem;

// import { useQuery } from "@tanstack/react-query";
// import { getProducts } from "../../../../features/products/requests.ts";
import ProductItem from "./ProductItem";
import type { IProduct } from "../../../../features/products/interface.ts";
import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/selectors.ts";
import { Link } from "react-router";
import { OrbitProgress } from "react-loading-indicators";

const ProductList = ({
  extraStyle = "",
  data,
  isPending,
  isShop = false,
}: {
  extraStyle?: string;
  data: IProduct[];
  isPending: boolean;
  isShop?: boolean;
}) => {
  // const listOfProduct: { title: string; price: number }[] = [
  //   { title: "title 1", price: 20.0 },
  //   { title: "title 2", price: 399.5 },
  //   { title: "title 3", price: 30.0 },
  //   { title: "title 4", price: 20.0 },
  //   { title: "title 5", price: 399.5 },
  //   { title: "title 6", price: 30.0 },
  // ];

  const role = useSelector(userRole);

  const condition = (productIsArchived: boolean) => {
    // return role === "admin" && productIsArchived;
    if (role === "admin") {
      return true;
    } else {
      return !productIsArchived;
    }
  };

  // console.log("condition: ", condition(true));

  return (
    <div className={"items-center justify-center " + extraStyle}>
      {isPending ? (
        // "Loading..."
        <div className="flex flex-col flex-1 items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <>
          {data && data.length > 0 && (
            <ul
              className={`grid grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-2 gap-x-4 gap-y-6 min-[1024px]:gap-x-14 min-[1024px]:gap-y-21 min-[1440px]:grid-cols-3 ${
                isShop ? "min-[1440px]:gap-x-6 min-[1440px]:gap-y-17.5" : ""
              }`}
            >
              {data.map((p: IProduct) => {
                return (
                  <li key={p.id}>
                    {/* {!p.isArchived && <ProductItem key={p.title} product={p} />} */}
                    {condition(p.isArchived) && (
                      <ProductItem key={p.title} product={p} isShop={isShop} />
                    )}
                  </li>
                );
              })}

              {role === "admin" && (
                <li key="add_product" className="justify-self-center">
                  <Link
                    to="/product/create"
                    className={`rounded-sm border border-(--gray) border-dashed size-34   text-(--dark-gray) flex items-center justify-center hover:cursor-pointer ${
                      isShop ? "lg:size-75" : "lg:size-94"
                    }`}
                  >
                    <p>Add product</p>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;

// return (
//   <div className={"items-center justify-center " + extraStyle}>
//     {isPending ? (
//       "Loading..."
//     ) : (
//       <>
//         {data && data.length > 0 ? (
//           <ul className="grid grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-2 gap-x-4 gap-y-6 min-[1024px]:gap-x-14 min-[1024px]:gap-y-21 min-[1440px]:grid-cols-3 ">
//             {data.map((p: IProduct) => {
//               return (
//                 <li key={p.id}>
//                   {/* {!p.isArchived && <ProductItem key={p.title} product={p} />} */}
//                   {condition(p.isArchived) && (
//                     <ProductItem key={p.title} product={p} />
//                   )}
//                 </li>
//               );
//             })}

//             {role === "admin" && (
//               <li key="add_product" className="justify-self-center">
//                 <Link
//                   to="/product/create"
//                   className="rounded-sm border border-(--gray) border-dashed size-34 lg:size-94  text-(--dark-gray) flex items-center justify-center hover:cursor-pointer"
//                 >
//                   <p>Add product</p>
//                 </Link>
//               </li>
//             )}
//           </ul>
//         ) : (
//           <>
//             <p>No products</p>
//           </>
//           // <div className="flex flex-col items-center justify-center">
//           //   <p>No products</p>
//           // </div>
//         )}
//       </>
//     )}
//   </div>
// );

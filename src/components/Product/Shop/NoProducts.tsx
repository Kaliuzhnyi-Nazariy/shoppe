import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/selectors";
import { Link } from "react-router";

const NoProducts = ({
  productLength,
  isPending,
}: {
  productLength: number;
  isPending: boolean;
}) => {
  const role = useSelector(userRole);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* {isPending ? (
        <p>Loading...</p>
      ) : ( */}
      <>
        {!isPending && productLength === 0 && (
          <>
            <p>No products</p>
            {role == "admin" && (
              <Link
                to="/product/create"
                className="px-8 py-2 rounded-sm bg-black text-white border border-transparent hover:bg-white hover:text-black hover:border-black active:bg-white active:text-black active:border-black transition-colors mt-3"
              >
                Add product
              </Link>
            )}
          </>
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default NoProducts;

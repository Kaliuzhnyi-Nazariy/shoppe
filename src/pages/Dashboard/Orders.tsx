import { useQuery } from "@tanstack/react-query";
import NoInList from "../../components/Dashboard/NoInList";
import Section from "../../components/Section";
import { getOrders } from "../../../features/order/requests";
import OrderList from "../../components/Dashboard/Order/OrderList";
import { useSelector } from "react-redux";
import { userRole } from "../../../features/user/selectors";
import Searchbar from "../../components/Searchbar";
import { useSearchParams } from "react-router";

const Orders = () => {
  const role = useSelector(userRole);

  const [params, setParams] = useSearchParams();

  const searchParam = params.get("order") || "";

  const { data: orderSearchbar = [], isFetching: searchPending } = useQuery({
    queryKey: ["searchOrders", searchParam],
    queryFn: () => getOrders(searchParam),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams((prev) => {
      const params = new URLSearchParams(prev);

      if (e.target.value.trim().length > 0) {
        params.set("order", e.target.value);
      } else {
        params.delete("order");
      }

      return params;
    });

  return (
    <Section extraStyles="pb-24" changePaddings="min-[1024px]:px-24">
      {role === "admin" && (
        <Searchbar
          extraStyles="mb-6"
          value={searchParam}
          onChange={onChange}
          pending={searchPending}
          showSearchResult={false}
        />
      )}
      {searchPending ? (
        <p>Loading</p>
      ) : (
        <>
          {orderSearchbar.length === 0 && searchParam.length === 0 ? (
            <NoInList link="/shop" message="No order has been made yet." />
          ) : (
            <>
              {orderSearchbar.length === 0 ? (
                <p>Order is not found</p>
              ) : (
                <OrderList data={orderSearchbar} />
              )}
            </>
          )}
        </>
      )}
    </Section>
  );
};

export default Orders;

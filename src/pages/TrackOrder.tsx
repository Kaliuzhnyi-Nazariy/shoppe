import { Search, X } from "lucide-react";
import Section from "../components/Section";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderValidation } from "../validation/trackOrder";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelOrder,
  getOrderById,
  updateOrderStatus,
} from "../../features/order/requests";
import { useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";
// import type { IOrderItem } from "../../features/order/interface";
import { useSelector } from "react-redux";
import { userRole } from "../../features/user/selectors";
import StyledButton from "../components/StyledButton";
import MobTrack from "../components/Track/MobTrack";
import PcTrack from "../components/Track/PcTrack";
import { errorToast, successToast } from "../components/toast";

const TrackOrder = () => {
  interface TrackOrderId {
    orderId: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TrackOrderId>({
    mode: "all",
    resolver: zodResolver(trackOrderValidation),
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const submitHandle: SubmitHandler<TrackOrderId> = (data) => {
    setSearchParams({ order: data.orderId });
  };

  const orderId = searchParams.get("order");

  const { data: order, isPending } = useQuery({
    queryKey: ["getOrderById", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: !!orderId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // console.log({ order });

  useEffect(() => {
    if (orderId) {
      reset({
        orderId: orderId,
      });
    }
  }, [orderId, reset]);

  const cleanOrder = () => {
    const url = new URLSearchParams(searchParams);
    url.delete("order");
    setSearchParams(url);

    reset({
      orderId: "",
    });
  };

  const queryClient = useQueryClient();

  const { mutate: cancelOrderFn, isPending: cancelingOrder } = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    retry: false,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getOrderById", orderId] });
      successToast("Order is canceled!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const { mutate: updateOrderStatusFn, isPending: updatingOrderStatus } =
    useMutation({
      mutationFn: (id: string) => updateOrderStatus(id),
      retry: false,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["getOrderById", orderId] });
        successToast("Order status updated!");
      },
      onError(err) {
        const error = err as {
          response?: { data?: { message: string } };
        };
        errorToast(error.response?.data?.message || "Something went wrong!");
      },
    });

  const role = useSelector(userRole);
  const navigate = useNavigate();

  const goHomeFn = () =>
    role ? navigate("/account/dashboard/orders") : navigate("/");

  return (
    <Section extraStyles="flex flex-col flex-1">
      {role && role === "admin" && (
        <form onSubmit={handleSubmit(submitHandle)} className="w-full text-xs">
          <label
            htmlFor="orderId"
            className="bg-(--light-gray) w-full p-3 rounded-sm text-xs flex items-center gap-3"
          >
            <input
              type="text"
              className="outline-none border-b border-transparent w-8/10 focus-within:border-(--gray) transition-all transform flex-1"
              placeholder="Write your order id"
              id="orderId"
              {...register("orderId")}
            />

            {orderId ? (
              <button type="button" onClick={() => cleanOrder()}>
                <X className="size-3 text-(--dark-gray)" />
              </button>
            ) : (
              <button>
                <Search className="size-3 text-(--dark-gray)" />
              </button>
            )}
          </label>
          {errors.orderId && (
            <p className="text-(--error)">{errors.orderId.message}</p>
          )}
        </form>
      )}

      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        {isPending && orderId ? (
          <OrbitProgress color="var(--gray)" />
        ) : order ? (
          <>
            <MobTrack
              order={order}
              cancelOrderFn={cancelOrderFn}
              cancelingOrder={cancelingOrder}
              role={role}
              updateOrderStatusFn={updateOrderStatusFn}
              updatingOrderStatus={updatingOrderStatus}
            />
            <PcTrack
              order={order}
              cancelOrderFn={cancelOrderFn}
              cancelingOrder={cancelingOrder}
              role={role}
              updateOrderStatusFn={updateOrderStatusFn}
              updatingOrderStatus={updatingOrderStatus}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Search your order</p>
          </div>
        )}

        <StyledButton
          text="GO BACK"
          fn={goHomeFn}
          extraStyles="mt-6 text-s w-full py-1.5"
        />
      </div>
    </Section>
  );
};

export default TrackOrder;

// const DataField = ({
//   name,
//   orderData,
// }: {
//   name: string;
//   orderData?: string;
// }) => {
//   return (
//     <p>
//       <span className="font-bold">{name}:</span> {orderData && orderData}
//     </p>
//   );
// };

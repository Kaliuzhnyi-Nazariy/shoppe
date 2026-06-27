import { useKeenSlider } from "keen-slider/react";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../../features/user/selectors";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../../features/address/request";
import type { IAddress } from "../../../features/address/interface";
import { OrbitProgress } from "react-loading-indicators";

const AddressSlider = ({
  clickHandle,
  chosenAddress,
}: {
  clickHandle: (data: { address: IAddress; idx: number }) => void;
  chosenAddress: number | null;
}) => {
  const isUserLoggedIn = useSelector(userLoggedIn);

  const { data: addresses, isPending: fetchingAddresses } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: getAddresses,
    retry: false,
    enabled: isUserLoggedIn,
  });

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 16 },
      },
    },
  });
  return (
    <>
      {fetchingAddresses ? (
        <div className="flex flex-col items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <>
          {addresses.length > 0 ? (
            <div ref={ref} className="keen-slider flex overflow-x-hidden">
              {addresses.map((a: IAddress, idx: number) => {
                return (
                  <div
                    className={`keen-slider__slide text-xs w-full h-50 border min-w-full lg:min-w-57.5 lg:max-w-57.5 ${
                      chosenAddress === idx
                        ? "border-(--accent) text-black"
                        : "border-(--dark-gray)"
                    } rounded-xl p-5 flex flex-col gap-2 transition-colors duration-150`}
                    key={a.id}
                    onClick={() => clickHandle({ address: a, idx })}
                  >
                    <h4 className="font-bold">
                      {a.firstName} {a.lastName}
                    </h4>

                    {a.companyName && (
                      <h5 className="font-semibold">{a.companyName}</h5>
                    )}

                    <p>{a.streetAddress}</p>
                    <p>
                      {a.postcode}, {a.city}
                    </p>
                    <p>{a.country}</p>
                    <p>{a.email}</p>
                    <p>{a.phone}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No addresses yet!</p>
          )}
        </>
      )}
    </>
  );
};

export default AddressSlider;

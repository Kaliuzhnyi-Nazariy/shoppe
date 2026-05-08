import Address from "../../components/Dashboard/Address/Address";
import Section from "../../components/Section";

import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../../features/address/request";

const Addresses = () => {
  // const billingAddresses: string[] = [];
  // const shippingAddresses: string[] = [];

  // const { data, isPending } = useQuery({
  const { data: billingAddresses, isPending: billingPending } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: getAddresses,
  });

  // console.log(data);

  return (
    <Section extraStyles="mb-24" changePaddings="min-[1024px]:px-24">
      <p>
        The following addresses will be used on the checkout page by default.
      </p>

      <ul className="flex flex-col gap-12">
        <li>
          <Address
            // name="Billing"
            addresses={billingAddresses}
            addressesPending={billingPending}
          />
        </li>
        <li>
          {/* <Address name="Shipping" addresses={shippingAddresses} /> */}
        </li>
      </ul>
    </Section>
  );
};

export default Addresses;

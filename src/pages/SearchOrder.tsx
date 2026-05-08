import { Search } from "lucide-react";
import Section from "../components/Section";

const SearchOrder = () => {
  return (
    <Section extraStyles="w-full min-h-full flex items-center justify-center flex-1">
      {/* <label
        htmlFor="orderId"
        className="bg-(--gray) w-full h-10 rounded-sm"
      ></label> */}
      <label
        htmlFor="orderId"
        className="bg-(--light-gray) w-full p-3 rounded-sm text-xs flex items-center gap-3"
      >
        <input
          type="text"
          className="outline-none border-b border-transparent w-8/10 focus-within:border-(--gray) transition-all transform flex-1"
          placeholder="Write your order id"
          id="orderId"
        />
        <button>
          <Search className="size-3 text-(--dark-gray)" />
        </button>
      </label>
    </Section>
  );
};

export default SearchOrder;

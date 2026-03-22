import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <label className="bg-(--light-gray) text-(--dark-gray) flex gap-2 p-2.5 rounded-sm items-center w-full">
      <Search className="size-3 text-(--dark-gray)" />
      <input type="text" placeholder="Search..." className="outline-none" />
    </label>
  );
};

export default Searchbar;

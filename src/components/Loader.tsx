import { OrbitProgress } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <OrbitProgress color="var(--gray)" size="small" />
    </div>
  );
};

export default Loader;

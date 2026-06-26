import { useNavigate, useParams } from "react-router";
import Section from "../../components/Section";
import StyledButton from "../../components/StyledButton";
import { Copy } from "lucide-react";
import { successToast } from "../../components/toast";

const Success = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  if (!orderId) {
    return (
      <Section extraStyles="flex flex-col items-center justify-center flex-1 bg-(--gray)">
        <div className="w-70 h-45 p-4 flex flex-col items-center justify-center gap-4 bg-white rounded-sm">
          <h1>Order not found</h1>
          <StyledButton text="Home" fn={() => navigate("/")} />
        </div>
      </Section>
    );
  }

  const rootLink = window.location.href.split("/order")[0];

  const link = `${rootLink}/order/track?order=${orderId}`;

  return (
    <Section extraStyles="flex flex-col items-center justify-center flex-1 bg-(--gray) md:bg-white">
      <div className="w-70 p-4 flex flex-col items-center justify-center gap-4 bg-white rounded-sm md:w-3/5 md:h-full">
        <h1>Order placed!</h1>
        <p>Copy the link to track the order!</p>
        <div className="rounded-sm border border-(--gray) bg-(--light-gray) flex items-center w-full mx-auto">
          <p className="px-2 py-3 flex-1 lg:max-w-4xl truncate">{link}</p>
          <button
            type="button"
            className="h-full px-3 cursor-pointer"
            onClick={() => {
              window.navigator.clipboard.writeText(link);
              successToast("Link copied!");
            }}
          >
            <Copy />
          </button>
        </div>
        <StyledButton text="Home" fn={() => navigate("/")} />
      </div>
    </Section>
  );
};

export default Success;

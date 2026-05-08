import { Copy } from "lucide-react";
import StyledButton from "../StyledButton";
import { useEffect } from "react";

const LinkModal = ({
  isOpen = false,
  closeModal,
  link = "",
}: {
  isOpen: boolean;
  closeModal: () => void;
  link: string;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div
      className={
        "fixed top-1/2 left-1/2 -translate-1/2 w-full h-full bg-black/50 flex items-center justify-center z-50 " +
        (isOpen ? "" : "hidden")
      }
    >
      <div className="bg-white p-6 lg:p-12.5 text-center flex flex-col gap-3 text-xs lg:text-[16px] justify-center items-center w-4/5 lg:w-full lg:max-w-197">
        <h2 className="font-bold text-[16px] lg:text-xl">Order is placed</h2>
        <p className="text-wrap w-4/5">
          Copy the link to track the order (or lose it forever)
        </p>
        <div className="rounded-sm border border-(--gray) bg-(--light-gray) flex items-center w-full mx-auto">
          <p className="px-2 py-3 flex-1 lg:max-w-4xl truncate">{link}</p>
          <button
            type="button"
            className="h-full px-3 cursor-pointer"
            onClick={() => {
              window.navigator.clipboard.writeText(link);
            }}
          >
            <Copy />
          </button>
        </div>
        <StyledButton text="CLOSE" fn={closeModal} />
      </div>
    </div>
  );
};

export default LinkModal;

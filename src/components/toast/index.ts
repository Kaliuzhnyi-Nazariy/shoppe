import toast from "react-hot-toast";

export const successToast = (message: string) =>
  toast.success(message, {
    style: {
      padding: "16px 20px",
      background: "var(--light-gray)",
      borderTop: "2px solid var(--accent)",
    },
    iconTheme: {
      primary: "var(--accent)",
      secondary: "var(--light-gray)",
    },
  });

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: "var(--light-gray)",
      borderTop: "2px solid var(--accent)",
    },
    iconTheme: {
      primary: "var(--accent)",
      secondary: "var(--light-gray)",
    },
  });
};

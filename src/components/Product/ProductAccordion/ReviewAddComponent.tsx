import { useState } from "react";
import StyledButton from "../../StyledButton";
import ReviewForm from "./ReviewForm";

const ReviewAddComponent = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {!showForm ? (
        <StyledButton
          text="Add comment"
          fn={openForm}
          btnType="button"
          extraStyles="w-fit px-4 py-2"
        />
      ) : (
        <div className="flex flex-col gap-8">
          <StyledButton
            text="Cancel"
            fn={closeForm}
            btnType="button"
            type="secondary"
            extraStyles="w-fit px-4 py-2"
          />

          <ReviewForm closeForm={closeForm} />
        </div>
      )}
    </>
  );
};

export default ReviewAddComponent;

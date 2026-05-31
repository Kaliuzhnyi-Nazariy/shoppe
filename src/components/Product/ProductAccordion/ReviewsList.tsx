import Rating from "@mui/material/Rating";
import type { IReview } from "../../../../features/review/interface";
import { useSelector } from "react-redux";
import { userId, userLoggedIn } from "../../../../features/user/selectors";
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../../../features/review/requests";
import { OrbitProgress } from "react-loading-indicators";
import { successToast } from "../../toast";

const ReviewsList = ({
  reviews,
  reviewsCount,
}: {
  reviews: IReview[];
  reviewsCount: number;
}) => {
  const formattedDate = (date: string) => {
    const newDate = new Date(date);

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(newDate)
      .replace(/(\d+ \w+) (\d+)/, "$1, $2");
  };

  const isAuthed = useSelector(userLoggedIn);
  const userIdValue = useSelector(userId);

  const [isUpdateMode, setUpdateMode] = useState(false);

  const openUpdateMode = () => {
    setUpdateMode(true);
  };

  const closeUpdateMode = () => {
    setUpdateMode(false);
  };

  const client = useQueryClient();

  const { mutate, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess(data) {
      console.log(data);
      successToast("Review deleted!");
      client.invalidateQueries({ queryKey: ["getReview", data.productId] });
    },
  });

  return (
    <>
      {reviews && reviews.length > 0 && (
        <div className="mt-15">
          <h5>Comments({reviewsCount})</h5>
          <ul className="mt-13">
            {reviews.map((review) => {
              return (
                <React.Fragment key={review.id}>
                  {review.userId === userIdValue && isUpdateMode ? (
                    <ReviewForm
                      key="form"
                      extraStyles="mt-10"
                      closeForm={closeUpdateMode}
                      reviewData={review}
                      type="update"
                    />
                  ) : (
                    <li
                      key={review.id}
                      className="text-xs py-6 not-last:border-b not-last:border-b-(--gray) text-(--dark-gray)"
                    >
                      <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 lg:items-center ">
                        <h3 className="lg:text-xl text-black">
                          {review.user.displayName}
                        </h3>
                        <p className="">{formattedDate(review.createdAt)}</p>
                        <Rating
                          value={Number(review.rating)}
                          style={{ color: "black", fontSize: "12px" }}
                        />
                      </div>

                      {review.comment.length > 0 && (
                        <article className="mt-4">{review.comment}</article>
                      )}

                      {isAuthed && review.userId === userIdValue && (
                        <>
                          {deleting ? (
                            <OrbitProgress />
                          ) : (
                            <div className="mt-4 flex items-center gap-2">
                              <button onClick={() => mutate(review.id)}>
                                Delete
                              </button>
                              <button onClick={openUpdateMode}>Update</button>
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ReviewsList;

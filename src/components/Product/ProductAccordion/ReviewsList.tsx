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
      successToast("Review deleted!");
      client.invalidateQueries({ queryKey: ["getReview", data.productId] });
    },
  });

  return (
    <>
      {reviews && reviews.length > 0 ? (
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
                      className="text-xs py-6 not-last:border-b not-last:border-b-(--gray) text-(--dark-gray) lg:text-[16px]"
                    >
                      <div className="flex flex-col gap-2 min-[1024px]:flex-row min-[1024px]:gap-4 min-[1024px]:items-center min-[1440px]:flex-col min-[1440px]:items-start ">
                        <div className="flex gap-2 items-center">
                          <h3 className="lg:text-xl text-black">
                            {review.user.displayName}
                          </h3>
                          <p className="lg:text-[14px]">
                            {formattedDate(review.createdAt)}
                          </p>
                        </div>
                        <Rating
                          value={Number(review.rating)}
                          style={{ color: "black", fontSize: "16px" }}
                        />
                      </div>

                      {review.comment.length > 0 && (
                        <article className="mt-4 min-[1440px]:mt-6">
                          {review.comment}
                        </article>
                      )}

                      {isAuthed && review.userId === userIdValue && (
                        <>
                          {deleting ? (
                            <OrbitProgress
                              size="small"
                              color={"var(--gray)"}
                              style={{ fontSize: 12 }}
                            />
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
      ) : (
        <div className="h-full items-center flex justify-center mt-12 min-[1440px]:m-0">
          <p>No reviews</p>
        </div>
      )}
    </>
  );
};

export default ReviewsList;

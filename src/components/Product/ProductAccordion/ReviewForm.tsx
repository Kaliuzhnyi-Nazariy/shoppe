import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import Input from "../../Input";
import { useSelector } from "react-redux";
import {
  userDisplayName,
  userEmail,
  userLoggedIn,
} from "../../../../features/user/selectors";
import Rating from "@mui/material/Rating";
import StyledButton from "../../StyledButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReviewValidation } from "../../../validation/review";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, updateReview } from "../../../../features/review/requests";
import { successToast } from "../../toast";
import type {
  IAddReview,
  IReview,
  IUpdateReview,
} from "../../../../features/review/interface";

interface IReviewForm {
  name: string;
  email: string;
  comment?: string;
  rating: number;
}

const ReviewForm = ({
  closeForm,
  type = "add",
  reviewData,
  extraStyles = "",
  isReviewLeft = false,
}: {
  closeForm?: () => void;
  type?: "add" | "update";
  reviewData?: IReview;
  extraStyles?: string;
  isReviewLeft?: boolean;
}) => {
  const { pathname } = useLocation();
  const productId = pathname.split("/")[pathname.split("/").length - 1];

  const isUserLoggedIn = useSelector(userLoggedIn);

  const methods = useForm<IReviewForm>({
    mode: "all",
    resolver: zodResolver(addReviewValidation),
  });

  const client = useQueryClient();

  const { mutate: addReviewFn, isPending: addingReview } = useMutation({
    mutationFn: ({ email, name, comment, rating, productId }: IAddReview) =>
      addReview({
        email,
        name,
        comment,
        rating,
        productId,
      }),

    onSuccess() {
      successToast("Review was added!");

      if (closeForm) {
        closeForm();
      }
      if (!isUserLoggedIn) {
        successToast("Account created!");
      }
      client.invalidateQueries({ queryKey: ["getReview", productId] });
      client.invalidateQueries({ queryKey: ["getProduct", { productId }] });

      methods.setValue("comment", "");
      methods.setValue("rating", 0);
    },
  });

  const { mutate: updateReviewFn, isPending: updatingReview } = useMutation({
    mutationFn: ({ reviewId, comment, rating }: IUpdateReview) =>
      updateReview({
        comment,
        rating,
        reviewId,
      }),

    onSuccess() {
      successToast("Review was updated!");
      if (closeForm) {
        closeForm();
      }

      methods.reset({
        comment: "",
        rating: 0,
      });

      client.invalidateQueries({ queryKey: ["getReview", productId] });
      client.invalidateQueries({ queryKey: ["getProduct", { productId }] });
    },
  });

  const commentValues = methods.watch("comment");

  const isFilled =
    typeof commentValues === "string" && commentValues.trim().length > 0;

  const handleSubmit: SubmitHandler<IReviewForm> = (data) => {
    // console.log(data);

    // productId -

    const returnComment =
      data.comment && data.comment.length > 0 ? data.comment : "";

    if (type === "add") {
      addReviewFn({ ...data, comment: returnComment, productId });
    } else {
      if (reviewData) {
        updateReviewFn({
          ...data,
          comment: returnComment,
          reviewId: reviewData.id,
        });
      }
      // console.log(data);
      return;
    }

    return;
  };

  const name = useSelector(userDisplayName);
  const email = useSelector(userEmail);

  useEffect(() => {
    if (isUserLoggedIn) {
      methods.setValue("name", name);
      methods.setValue("email", email);
    }

    if (reviewData) {
      methods.setValue("comment", reviewData.comment);
      methods.setValue("rating", Number(reviewData.rating));
    }

    methods.trigger();
  }, [email, isUserLoggedIn, methods, name, reviewData]);

  const buttonText = type === "add" ? "Post" : "Update";

  return (
    <FormProvider {...methods}>
      <form
        className={"flex flex-col gap-6 " + extraStyles}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {!isUserLoggedIn && (
          <div className="flex flex-col gap-6 min-[560px]:grid min-[560px]:grid-cols-2">
            <Input<IReviewForm> label="Name" name="name" />
            <Input<IReviewForm> label="Email" name="email" type="email" />
          </div>
        )}
        <div className="group text-(--dark-gray) focus-within:text-black text-xs lg:text-[16px] relative">
          <label
            htmlFor={"comment"}
            className={`absolute duration-150 group-focus-within:-translate-y-full ${
              isFilled ? "-translate-y-full" : "translate-y-1.5"
            }`}
          >
            Comment
          </label>
          <textarea
            id="comment"
            {...methods.register("comment")}
            className="border-b border-b-(--light-gray)  outline-none py-1.5 w-full resize-none max-h-30 relative"
            rows={1}
            // disabled={disabled}
          />

          {methods.formState.errors && (
            <p className="text-xs text-(--error) mt-2">
              {methods.formState.errors?.comment?.message}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p>Rating</p>
          <Controller
            control={methods.control}
            name="rating"
            defaultValue={0}
            render={({ field }) => (
              <Rating
                {...field}
                value={field.value}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                style={{
                  color: "black",
                }}
              />
            )}
          />
        </div>
        {isReviewLeft ? (
          <p className="text-(--error) mx-auto">
            You have already left a review!
          </p>
        ) : (
          <StyledButton
            text={buttonText}
            isValid={methods.formState.isValid && !isReviewLeft}
            pending={addingReview || updatingReview}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default ReviewForm;

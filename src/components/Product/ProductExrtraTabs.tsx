import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Section from "../Section";
import Tabs from "@mui/material/Tabs";
import type { IReview } from "../../../features/review/interface";
import ReviewsList from "./ProductAccordion/ReviewsList";
import ReviewForm from "./ProductAccordion/ReviewForm";
import { useSelector } from "react-redux";
import { userId } from "../../../features/user/selectors";

const ProductExrtraTabs = ({
  reviews,
  reviewsCount,
  additionalInformation,
  description,
}: {
  reviewsCount: number;
  reviews: IReview[];
  additionalInformation?: string;
  description: string;
}) => {
  const [value, setValue] = useState<
    "description" | "additional_information" | "reviews"
  >("description");

  const tabs = [
    { label: "Description", value: "description" },
    ...(additionalInformation
      ? [{ label: "Additional information", value: "additional_information" }]
      : []),
    { label: `Reviews (${reviewsCount})`, value: "reviews" },
  ];

  const userIdValue = useSelector(userId);

  const isUserLeftReview =
    reviews && reviews.some((review) => review.userId === userIdValue);

  return (
    <Section extraStyles="hidden min-[1440px]:block ">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            variant="standard"
            slotProps={{
              indicator: {
                style: { height: "1px", backgroundColor: "black" },
              },
            }}
            sx={{ color: "var(--light-gray)" }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                sx={{
                  textTransform: "uppercase",
                  minWidth: "auto",
                  paddingX: 2,

                  "&.Mui-selected": {
                    color: "black",
                  },
                }}
              />
            ))}
          </Tabs>
          <Box sx={{ mt: "42px" }}>
            {value === "description" && <p>{description}</p>}

            {value === "additional_information" && additionalInformation && (
              <p>{additionalInformation}</p>
            )}

            {value === "reviews" && (
              <div className="grid grid-cols-2 gap-6">
                <ReviewsList reviews={reviews} reviewsCount={reviewsCount} />
                <ReviewForm isReviewLeft={isUserLeftReview} />
              </div>
            )}
            {/* {value === "reviews" && <p>{reviews}</p>} */}
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default ProductExrtraTabs;

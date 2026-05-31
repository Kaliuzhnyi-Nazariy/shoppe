import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReviewAddComponent from "./ReviewAddComponent";
import type { IReview } from "../../../../features/review/interface";
import ReviewsList from "./ReviewsList";

export const ProductAccordion = ({
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
  return (
    <div className="min-[1440px]:hidden text-xs">
      <Accordion
        elevation={0}
        square
        sx={{
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
          "&.Mui-expanded": { margin: 0 },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 0,
            fontSize: "12px",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Description</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "none",
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
            fontSize: "12px",
          }}
        >
          {description}
        </AccordionDetails>
      </Accordion>
      {additionalInformation && (
        <Accordion
          elevation={0}
          square
          sx={{
            boxShadow: "none",
            border: "none",
            "&:before": { display: "none" },
            "&.Mui-expanded": { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ px: 0 }}
          >
            <Typography component="span" sx={{ fontSize: "12px" }}>
              Additional information
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: "12px" }}>
            {additionalInformation}
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion
        elevation={0}
        square
        sx={{
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
          "&.Mui-expanded": { margin: 0 },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          // expandIcon={reviews !== 0 && <ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ px: 0, ":disabled": { opacity: "100%" } }}
          // disabled={reviews === 0}
        >
          <Typography component="span" sx={{ fontSize: "12px" }}>
            Reviews ({reviewsCount}){/* Reviews ({reviews}) */}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <ReviewForm /> */}
          <ReviewAddComponent />

          <ReviewsList reviews={reviews} reviewsCount={reviewsCount} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

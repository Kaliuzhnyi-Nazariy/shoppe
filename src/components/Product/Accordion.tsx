import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export const ProductAccordion = ({
  reviews,
  additionalInformation,
  description,
}: {
  reviews: number;
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
          expandIcon={reviews !== 0 && <ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{ px: 0, ":disabled": { opacity: "100%" } }}
          disabled={reviews === 0}
        >
          <Typography component="span" sx={{ fontSize: "12px" }}>
            Reviews ({reviews})
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ fontSize: "12px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

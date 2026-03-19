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
    <div>
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
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            border: "none",
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
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
            <Typography component="span">Additional information</Typography>
          </AccordionSummary>
          <AccordionDetails>{additionalInformation}</AccordionDetails>
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
          <Typography component="span">Reviews ({reviews})</Typography>
        </AccordionSummary>
        <AccordionDetails>
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

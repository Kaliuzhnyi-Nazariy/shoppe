import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export const AccordionUsage = () => {
  const reviews = [];

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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
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
        >
          <Typography component="span">Additional information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
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
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Reviews ({reviews.length})</Typography>
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

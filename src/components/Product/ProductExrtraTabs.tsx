import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Section from "../Section";
import Tabs from "@mui/material/Tabs";

const ProductExrtraTabs = ({
  reviews,
  additionalInformation,
  description,
}: {
  reviews: number;
  additionalInformation?: string;
  description: string;
}) => {
  const [value, setValue] = useState<
    "description" | "additional_information" | "reviews"
  >("description");

  // const tabs = additionalInformation
  //   ? ["description", "additional_information", "reviews"]
  //   : ["description", "reviews"];

  // const activeIndex = tabs.indexOf(value);
  // const width = 100 / tabs.length;

  const tabs = [
    { label: "Description", value: "description" },
    ...(additionalInformation
      ? [{ label: "Additional information", value: "additional_information" }]
      : []),
    { label: `Reviews (${reviews})`, value: "reviews" },
  ];

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
            variant="standard" // important (no fullWidth)
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

            {value === "reviews" && <p>{reviews}</p>}
          </Box>
          {/* <div
            className="absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300"
            style={{
              width: `${width}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />{" "}
          <Tab
            label="Description"
            value="description"
            onChange={() => handleChange("description")}
          />
          {additionalInformation && (
            <Tab
              label="Additional information"
              value="additional_information"
              onChange={() => handleChange("additional_information")}
            />
          )}
          <Tab
            label={`Reviews(${reviews})`}
            value="reviews"
            onChange={() => handleChange("reviews")}
          />
          <div>
          {value === "description"
          ? description
          : value === "additional_information"
          ? additionalInformation
          : reviews}
          </div> */}
          {/* <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel> */}
        </Box>
      </Box>
    </Section>
  );
};

export default ProductExrtraTabs;

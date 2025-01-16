import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
// import myteam from '../images/myteam.jpg';
import Link from "next/link";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { getImagePath } from "../../../utils/CustomImagePath";

const Hero = () => {
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        minHeight: "600px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={6}
        style={{
          display: "flex",
          alignItems: "center",
          // maxWidth: "1300px",
          padding: " 0px 50px",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            style={{
              paddingBottom: "15px",
            }}
          >
            Land Record Survey - Department of Revenue, Government of Himachal Pradesh
          </Typography>
          <Typography
            style={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              marginBottom: "4.8rem",
              opacity: 0.6,
            }}
          >

Efficiently collect and manage landowner data to maintain an updated Land Record Survey Database, ensuring accuracy and Aadhaar seeding for Government use.          </Typography>
          <Link href="/apk/Prod_Survey_1.27.apk" download>
            <Button
              variant="contained"
              // color="primary"
              style={{ marginLeft: 5 , background : "#2D6095"}}
            >
              Download the Application
            </Button>
          </Link>

          {/* <Button
            variant="string"
            style={{ marginLeft: 5, backgroundColor: "white", color: "#000" }}
            endIcon={<ArrowDownwardIcon />}
          >
            Learn More
          </Button> */}
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid  xs={12} md={5} pt={0}>
          <img
            src={getImagePath('/images/survey_numbers.jpg')}
            alt="My Team"
            style={{
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;

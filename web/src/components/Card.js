import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid } from '@mui/material';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function CustomCard(props) {
  const ulStyle = {
    border: "0.5px solid #66666",
    borderRadius: 20,
    marginTop: 40,

    boxShadow: "0 1px 8px 0 #d0d0d0",
  };
  const [cardValues, setCardValues] = useState({
    userAbbreviations: "",
    produectTitle: "",
    date: "",
    images: [],
    descriptions: "",
    category: "",
    subCategory: "",
  });
  const temp = {
    userAbbreviations: "א.ד",
    produectTitle: "טלוויזיה",
    date: "12.4.2022", 
    images:['https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60','https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60' ],
    descriptions: `טלוויזיה חדשה.
    42 אינץ.
    לא יורד אגורה.
    ומי שלא טוב לו יום טוב לו.`,
    category: "מוצרי חשמל",
    subCategory: "טלוויזיות",
  };
  useEffect(() => {
    setCardValues(temp);
  }, [cardValues]);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cardValues.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Grid
      item
      container
      justifyContent="center"
      className="create"
      xs={12}
      sm={8}
      md={6}
      lg={4}
      xl={3}
      
    >
      <Card sx={{ width: 360 }} style={ulStyle} className="card">
        <CardHeader
          style={{ textAlign: "end" }}
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], marginLeft: 2 }}
              aria-label="recipe"
            >
              {cardValues && cardValues.userAbbreviations}
            </Avatar>
          }
          title={cardValues && cardValues.produectTitle}
          subheader={cardValues && cardValues.date}
        />
        <Box sx={{ width: 360, flexGrow: 1 }}>
          {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper> */}
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {cardValues.images.map((step, index) => (
              <div>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: "block",
                      maxWidth: 360,
                      overflow: "hidden",
                      width: "100%",
                    }}
                    key={index}
                    src={cardValues.images[index]}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                variant="text"
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                הבא
                {theme.direction === "ltr" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                variant="text"
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "ltr" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                קודם
              </Button>
            }
          />
        </Box>
        {/* <CardMedia
        component="img"
        height="194"
        width="194"
        // image=""
        image={cardValues && cardValues.mainImage}
        alt="Tv"
      /> */}
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ fontSize: "16px", color: "black" }}
          >
            {cardValues && cardValues.descriptions}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Grid>
  );
}

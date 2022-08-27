import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid } from "@mui/material";
import NoImagePlaceholder from "../images/NoImagePlaceholder.png";
import { useNavigate } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function CustomCard(props) {
  const navigate = useNavigate();
  const randomNumber = () => {
    const generateRandomColor = Math.floor(Math.random() * 16777215).toString(
      16
    );
    // .padStart(6, "0");
    return `#${generateRandomColor}`;
  };
  const ulStyle = {
    border: "0.5px solid #66666",
    borderRadius: 5,
    marginTop: 40,
    boxShadow: "0 1px 8px 0 #d0d0d0",
  };

  const [images, setImages] = useState([]);
  const [cardValues, setCardValues] = useState({
    userAbbreviations:
      props.user.firstName.charAt(0) + "." + props.user.lastName.charAt(0),
    produectTitle: props.produectTitle,
    date: new Date(props.date).toLocaleDateString("en-GB"),
    images: images,
    descriptions: props.descriptions,
    category: props.category,
    subCategory: props.subCategory,
    replaceableCategoryNo1: props.replaceableCategoryNo1,
    replaceableSubCategoryNo1: props.replaceableSubCategoryNo1,
    replaceableCategoryNo2: props.replaceableCategoryNo2,
    replaceableSubCategoryNo2: props.replaceableSubCategoryNo2,
    replaceableCategoryNo3: props.replaceableCategoryNo3,
    replaceableSubCategoryNo3: props.replaceableSubCategoryNo3,
  });
  useEffect(() => {
    if (props.images) {
      props.images.image1 && images.push(props.images.image1.base64);
      props.images.image2 && images.push(props.images.image2.base64);
      props.images.image3 && images.push(props.images.image3.base64);
    } else {
      images.push(NoImagePlaceholder);
    }
  }, [images]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = cardValues.images && cardValues.images.length / 2;
  // console.log("emptyImage: ",  emptyImage);
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
      className="card"
      xs={12}
      sm={8}
      md={6}
      lg={4}
      xl={3}
    >
      {cardValues && (
        <Card
          sx={{ width: 350 }}
          style={ulStyle}
          className="card"
          onClick={() => {
            navigate(`/product?name=${props._id}`);
          }}
        >
          <CardHeader
            style={{ textAlign: "end" }}
            avatar={
              <Avatar
                sx={{ bgcolor: randomNumber, marginLeft: 2 }}
                aria-label="recipe"
              >
                {cardValues && cardValues.userAbbreviations}
              </Avatar>
            }
            title={cardValues && cardValues.produectTitle}
            subheader={cardValues && cardValues.date}
          />
          <Box sx={{ width: 350, flexGrow: 1 }}>
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
              key={activeStep + Math.random(10)}
            >
              {cardValues.images.map((step, index) => (
                <div key={step + index} id={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      // loading={index > 8 ? "lazy" : ""}
                      sx={{
                        height: 255,
                        margin: 2,
                        display: "block",
                        maxWidth: 320,
                        overflow: "hidden",
                        width: "100%",
                        class: "center",
                      }}
                      key={index}
                      src={
                        cardValues.images[index] && cardValues.images[index]
                        //  || emptyImage
                      }
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>

            {cardValues.images.length > 2 && (
              <MobileStepper
                style={{ justifyContent: "center" }}
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
            )}
          </Box>
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontSize: "16px", color: "black" }}
            >
              <Typography className="cardTitle" component="span">
                תיאור:{" "}
              </Typography>{" "}
              {cardValues && cardValues.descriptions}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontSize: "16px", color: "black" }}
            >
              <Typography className="cardTitle" component="span">
                שיוך:{" "}
              </Typography>{" "}
              {cardValues &&
                cardValues.category + ", " + cardValues.subCategory}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontSize: "16px", color: "black" }}
            >
              <Typography className="cardTitle" component="span">
                מוכן להחליף:{" "}
              </Typography>{" "}
              {cardValues &&
                cardValues.replaceableCategoryNo1 +
                  ", " +
                  cardValues.replaceableSubCategoryNo1}
              <br />
              {cardValues.replaceableCategoryNo2 &&
                cardValues.replaceableCategoryNo2 +
                  ", " +
                  cardValues.replaceableSubCategoryNo2}
              <br />
              {cardValues.replaceableCategoryNo3 &&
                cardValues.replaceableCategoryNo3 +
                  ", " +
                  cardValues.replaceableSubCategoryNo3}
            </Typography>
          </CardContent>

          <CardActions disableSpacing></CardActions>
        </Card>
      )}
    </Grid>
  );
}

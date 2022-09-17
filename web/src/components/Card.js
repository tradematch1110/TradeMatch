import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { authContext } from "./../contexts/AuthContext";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReportIcon from "@mui/icons-material/Report";
import {
  addFavoriteProductToUser,
  deleteProduct,
  removeFavoriteProductFromUser,
} from "../services/api";
import { useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const AutoPlaySwipeableViews = SwipeableViews;

export default function CustomCard(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    favouritesProducts,
    setFavouritesProducts,
  } = useContext(authContext);
  const [error, setError] = useState("");
  const [isFav, setIsFav] = useState("white");

  const randomNumber = () => {
    const generateRandomColor = Math.floor(Math.random() * 16777215).toString(
      16
    );
    // .padStart(6, "0");
    return `#${generateRandomColor}`;
  };
  const ulStyle = {
    marginTop: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };

  const ulStyleBottom = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  };

  const [images, setImages] = useState([]);
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const [cardValues, setCardValues] = useState({
    userAbbreviations:
      props.user &&
      props.user.firstName.charAt(0) + "." + props.user.lastName.charAt(0),
    produectTitle: props.user && props.produectTitle,
    date: props.user && new Date(props.date).toLocaleDateString("en-GB"),
    images: props.user && images,
    descriptions: props.user && props.descriptions,
    category: props.user && props.category,
    subCategory: props.user && props.subCategory,
    replaceableCategoryNo1: props.user && props.replaceableCategoryNo1,
    replaceableSubCategoryNo1: props.user && props.replaceableSubCategoryNo1,
    replaceableCategoryNo2: props.user && props.replaceableCategoryNo2,
    replaceableSubCategoryNo2: props.user && props.replaceableSubCategoryNo2,
    replaceableCategoryNo3: props.user && props.replaceableCategoryNo3,
    replaceableSubCategoryNo3: props.user && props.replaceableSubCategoryNo3,
    firstName: props.user && props.user.firstName,
    email: props.user && props.user.email,
    phoneNumber: props.user && props.user.phoneNumber,
  });
  useLayoutEffect(() => {
    if (props.images) {
      // console.log("props.images.image1;", props.images.image1);
      setImage1(props.images.image1);
      setImage2(props.images.image2);
      setImage3(props.images.image3);

      props.images.image1 && images.push(props.images.image1);
      props.images.image2 && images.push(props.images.image2);
      props.images.image3 && images.push(props.images.image3);
    } else {
      setImage1(NoImagePlaceholder);

      // images.push(NoImagePlaceholder);
    }
    console.log("cardValues card component :  ", cardValues);
  }, [images]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = images && images.length / 2;
  // console.log("emptyImage: ",  emptyImage);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useLayoutEffect(() => {
    console.log("props._id: ", props._id);
    console.log("favouritesProducts: ", favouritesProducts);

    if (favouritesProducts) {
      let flag = favouritesProducts.find((id) => props._id == id);
      if (flag) {
        setIsFav("red");
      } else {
        setIsFav("white");
      }
    } else {
      setIsFav("white");
    }
    // console.log("isFav: ", isFav);
    // console.log("favouritesProducts: ", favouritesProducts);
  }, [isFav]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleDelete = async () => {
    const flag = window.confirm("האם אתה בטוח שברצונך למחוק לצמיתות מוצר זה?");
    console.log(flag);
    if (flag) {
      const res = await deleteProduct(props._id);
      console.log("res deleteProduct", res);

      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          console.log(res.value);
          navigate(`/myProduct`);
          setCardValues(null);
          window.location.reload(false);
          break;
        case 2:
          setError(res);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    }
  };

  const HandleFavourites = async () => {
    const values = {
      productId: props._id,
      userId: currentUser.uid,
    };
    console.log("HandleFavourites values", values);
    let res;
    if (isFav === "white" && currentUser.email !== props.user.email) {
      res = await addFavoriteProductToUser(values);
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          console.log(res.value);
          setFavouritesProducts(res.value.favouritesProducts);
          setIsFav("red");
          break;
        case 2:
          setError(res);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    } else {
      res = await removeFavoriteProductFromUser(values);
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          console.log(res.value);
          setFavouritesProducts(res.value.favouritesProducts);
          setIsFav("gray");
          break;
        case 2:
          setError(res);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    }
    console.log("res HandleFavourites", res);
  };
  return (
    <Grid
      item
      container
      justifyContent="center"
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
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              key={activeStep + Math.random(10)}
            >
              {images.map((step, index) => (
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
                      key={index + Math.floor(Math.random(10000))}
                      src={
                        images[index] && images[index]
                        //  || emptyImage
                      }
                      loading="lazy"
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            {images.length > 2 &&
              location.pathname !== "/" &&
              location.pathname !== "/myProduct" && (
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
          {location.pathname === "/updateProduct" ||
            location.pathname === "/create_product" ||
            (location.pathname === "/user_messages" && (
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  style={{ fontSize: "16px", color: "black" }}
                >
                  <Typography className="cardTitle" component="span">
                    {cardValues.firstName}
                  </Typography>{" "}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  style={{ fontSize: "16px", color: "black" }}
                >
                  <Typography className="cardTitle" component="span">
                    {cardValues.phoneNumber}
                  </Typography>{" "}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  style={{ fontSize: "16px", color: "black" }}
                >
                  <Typography className="cardTitle" component="span">
                    {cardValues.email}
                  </Typography>{" "}
                </Typography>
              </CardContent>
            ))}
        </Card>
      )}
      {
        <Card
          style={ulStyleBottom}
          sx={{ width: 350, height: 50, padding: 1, background: "#032329" }}
        >
          <Grid container justifyContent="left" alignItems="center">
            {location.pathname === "/myProduct" && (
              <>
                <Tooltip title="ערוך מוצר" arrow dark>
                  <EditIcon
                    sx={{ margin: 1, color: "white", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/updateProduct?name=${props._id}`);
                    }}
                  />
                </Tooltip>
                <Tooltip title="מחק מוצר" arrow>
                  <DeleteForeverIcon
                    sx={{ margin: 1, color: "white", cursor: "pointer" }}
                    onClick={handleDelete}
                  />
                </Tooltip>
              </>
            )}
            {location.pathname !== "/myProduct" && (
              <>
                <Tooltip title="הוסף למועדפים" arrow>
                  <FavoriteIcon
                    sx={{ margin: 1, color: `${isFav}`, cursor: "pointer" }}
                    onClick={() => HandleFavourites()}
                  />
                </Tooltip>
                <Tooltip title="דווח על המוצר" arrow>
                  <ReportIcon
                    sx={{ margin: 1, color: "#CFCC07", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/report_message?id=${props._id}`);
                    }}
                  />
                </Tooltip>
              </>
            )}
          </Grid>
        </Card>
      }
    </Grid>
  );
}

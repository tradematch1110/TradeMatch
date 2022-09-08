import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Formik, Form } from "formik";
import { registerNewUser } from "../services/api";
// import CircularIndeterminate from "./common/Circular";
import { Grid, Hidden } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Textfield from "./TextFeild/index1";
import Button from "./Button";
// import { useHistory, useLocation } from "react-router";
import { RegisterFormCss } from "./RegisterFormCss";
import { authContext } from "../contexts/AuthContext";
// import { Link } from "react-router-dom";
import MainLogo from "./../svg/MainLogo";
import { FORM_PRODUCT_VALIDATION } from "./../validationService/Yupvalidation";
import "../App.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { useNavigate } from "react-router-dom";
// import Select from "../FormsUI/Select";
import { getCategoriesNames } from "./../services/api";
import { useTradeContext } from "../hooks/useTradeContext";

import { allCategories } from "../resourcees/categories";
import { useRef } from "react";
import { useField, useFormikContext } from "formik";

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

// css style to the form
const useStyles = RegisterFormCss;
// Configure JSS

// initial the formik form values for the register form
const INITIAL_FORM_STATE = {
  produectTitle: "",
  images: "",
  descriptions: "",
  category: "",
  subCategory: "",
  condition: "",
  replaceableCategory: "",
  replaceableSubCategory: "",
};

/// ---------------------------------- LoginFormM component-----------------------------
const ProductForm = () => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  // initialize context

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // initialize validation

  // initialize form values
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    produectTitle: "",
    descriptions: "",
    category: "",
    subCategory: "",
    condition: "",
    images: "",
    replaceableCategory: "",
    replaceableSubCategory: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedMainReplaceable, setSelectedMainReplaceable] = useState("");

  // setSelectedMain
  const [categoriesNames, setCategoriesNames] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [replaceSubCategories, setReplaceSubCategories] = useState("");
  const categoriesRef = useRef("");

  const handleChangeMainCategory = (e) => {
    console.log("subCategories: ", subCategories);
    console.log("e: ", e.target.value);
    setFieldValue("category", e.target.value);

    allCategories.find((subCategory) => {
      if (subCategory.name == e.target.value) {
        //  console.log(subCategory.subCategories);
        setSubCategories(subCategory.subCategories);
      }
    });
  };
  const handleChangeSubCategory = (e) => {
    console.log("subcategory evalue: ", e.target.value);
    setFieldValue("subcategory", e.target.value);
  };

  const handleChangeMainReplaceableCategory = (e) => {
    console.log("e: ", e.target.value);
    setFieldValue("replaceableCategory", e.target.value);

    allCategories.find((subCategory) => {
      if (subCategory.name == e.target.value) {
        //  console.log(subCategory.subCategories);
        setReplaceSubCategories(subCategory.subCategories);
      }
    });
  };

  const handleChangeReplaceSubCategory = (e) => {
    console.log("replaceableSubCategory", e.target.value);
  };
  //  handleChangeMainReplaceableCategory

  // const { categories, dispatch } = useTradeContext();
  useEffect(() => {
    // async function fetchData() {
    //   const res = await getCategoriesNames();
    //   console.log("res: ", res);
    //   switch (res.statusId) {
    //     case 1:
    //       // setCategoriesNames(res.value.categoriesNames);
    //       dispatch({ type: "SET_CATEGORIES", payload: res.value });
    //       console.log(res.value.categoriesNames);
    //       break;
    //     case 2:
    //       setError(res.value);
    //       setTimeout(() => {
    //         setError("");
    //       }, 5000);
    //       break;
    //     default:
    //   }
    // }
    // fetchData();
    let tempCategoriesNames = [];
    allCategories.forEach((category) => {
      tempCategoriesNames.push(category.name);
    });
    setCategoriesNames(tempCategoriesNames);
    // console.log(tempCategoriesNames);
  }, []);

  // useEffect(() => {
  //   // categoriesRef.current = categoriesNames
  //   allCategories.find((subCategory) => {
  //     // console.log(subCategory);
  //     if (subCategory.name == selectedMain){console.log(subCategory.subCategories);
  //       setSubCategories(subCategory.subCategories);
  //     }
  //   });
  //   console.log("selectedMain :", selectedMain);

  // }, [selectedMain]);

  // route consts
  //   const history = useHistory();
  //   const location = useLocation();
  // DB function //////////////////////////////////////////////////////////////////

  // send User Info To DB
  // handle Submit - register form
  const handleSubmit = async (values) => {
    console.log("values: ", values);
    setFormValues(values);
    setLoading(true);
    // const res = await registerNewUser(values);
    // console.log(res);
    // switch (res.statusId) {
    //   case 1:
    //     setFormValues(values);
    //     setCurrentUserName(values.firstName);
    //     navigate("/");
    //     setLoading(false);
    //     break;
    //   case 2:
    //     setLoading(false);
    //     setCurrentUserName(undefined);
    //     setError(res.value);
    //     setTimeout(() => {
    //       setError("");
    //     }, 5000);

    //     break;
    //   default:
    // }
  };
  // handle Submit - code form

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <CssBaseline />
        {categoriesNames && (
          <Grid
            className="formWrapper"
            container
            direction="row"
            maxwidth="xs"
            item
            justifyContent="center"
          >
            <Grid direction="column" container item xs={12} md={6}>
              <Grid direction="row" container justifyContent="center">
                {/* <Link to="/">
            <Hidden smDown>
              <MainLogo
                width={192}
                height={33}
                //   className={classes.logoMobile}
              />
            </Hidden>
            <Hidden smUp>
              <MainLogo
                width={145}
                height={25}
                //   className={classes.logoMobile}
              />
            </Hidden>
          </Link> */}
              </Grid>
              {/* {loading && !error} */}
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_PRODUCT_VALIDATION}
                onSubmit={(values, onSubmitProps) => {
                  handleSubmit(values, onSubmitProps);
                }}
              >
                {({ setFieldValue, dirty, isValid }) => (
                  <Form>
                    <Grid container item xs={12}>
                      <Hidden smUp>
                        <Grid
                          dir="column"
                          container
                          item
                          xs={12}
                          md={6}
                          justifyContent="center"
                          className={classes.image}
                        ></Grid>
                      </Hidden>
                      <Grid container item xs={12} justifyContent="center">
                        <p className={classes.title} />
                      </Grid>
                      {error && (
                        <Grid
                          className="input"
                          item
                          xs={12}
                          justifyContent="center"
                        >
                          {/* <h1 className={classes.errorMessage}>{error}</h1>{" "} */}
                          <h1>{error}</h1>{" "}
                        </Grid>
                      )}
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        item
                        className="input"
                        xs={12}
                      >
                        <Grid item xs={12} className="input">
                          {" "}
                          <Textfield name="produectTitle" label="שם המוצר" />
                        </Grid>
                      </Grid>
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        {/* <Gr> */}
                        <Grid item xs={12} className="input">
                          <Textfield name="descriptions" label="תאור" />
                        </Grid>{" "}
                      </Grid>
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        {/* <Gr> */}
                        <Grid item xs={12} className="input">
                          <Textfield name="condition" label="מצב" />
                        </Grid>{" "}
                      </Grid>
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        {
                          <Grid item xs={12} className="input">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                קטגוריה ראשית
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="category"
                                name="category"
                                label="קטגוריה ראשית"
                                onChange={handleChangeMainCategory}
                              >
                                {categoriesNames.map((item) => {
                                  return (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                            {/* <Select
                              id="category"
                              name="category"
                              label="קטגוריה ראשית"
                              options={categoriesNames}
                              setSelectedMain={setSelectedMain}
                            ></Select> */}
                          </Grid>
                        }
                      </Grid>
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        {subCategories && (
                          <Grid item xs={12} className="input">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                קטגוריה משנית
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="subCategory"
                                name="subCategory"
                                label="קטגוריה משנית"
                                onChange={handleChangeSubCategory}
                              >
                                {subCategories.map((item) => {
                                  return (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                            {/* <Select
                            name="subCategory"
                            label="קטגוריה משנית"
                            // options={subCategories && subCategories}
                            options={subCategories}
                          ></Select> */}
                          </Grid>
                        )}
                      </Grid>

                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        <Grid item xs={12} className="input">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              קטגוריה ראשית להחלפה
                            </InputLabel>
                            <Select
                              id="replaceableCategory"
                              name="replaceableCategory"
                              label="קטגוריה ראשית להחלפה"
                              onChange={handleChangeMainReplaceableCategory}
                            >
                              {categoriesNames.map((item) => {
                                return (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                          {/* <Select
                            name="replaceableCategory"
                            label="קטגוריה ראשית להחלפה"
                            options={categoriesNames}
                            setSelectedMainReplaceable={
                              setSelectedMainReplaceable
                            }
                          ></Select> */}
                        </Grid>
                      </Grid>
                      <Grid
                        direction="row"
                        container
                        justifyContent="center"
                        className="input"
                        item
                        xs={12}
                      >
                        {replaceSubCategories && (
                          <Grid item xs={12} className="input">
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                קטגוריה משנית להחלפה
                              </InputLabel>
                              <Select
                                name="replaceableSubCategory"
                                label="קטגוריה משנית להחלפה"
                                onChange={handleChangeReplaceSubCategory}
                              >
                                {replaceSubCategories.map((item) => {
                                  return (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                            {/* <Select
                            name="replaceableSubCategory"
                            label="קטגוריה משנית להחלפה"
                            options={["חמור", "שזלון"]}
                          ></Select> */}
                          </Grid>
                        )}
                      </Grid>
                      <Grid
                        //   className={classes.btnWrapper}
                        container
                        item
                        xs={12}
                        alignItems="center"
                        justifyContent="center"
                        // style={{ minHeight: '10vh' }}
                      >
                        <Button error={error}>נקסט</Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ProductForm;

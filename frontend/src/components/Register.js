import React, { useState, useLayoutEffect, useEffect } from "react";
import { Formik, Form } from "formik";
// import CircularIndeterminate from "./Circular";
import { Grid } from "@material-ui/core";
import Textfield from "../FormsUI/Textfield/index";
import Button from "../FormsUI/Button";
import {
  // jssPreset,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
// import i18n from "i18next";
// import { create } from "jss";
// import rtl from "jss-rtl";
import { LoginFormCss } from "./LoginFormCss";
import { FormGlobalStyle } from "./FormGlobalStyle";
import { Hidden } from "@mui/material";
import { FORM_REGISTER_VALIDATION } from "./../validationService/Yupvalidation";
// import ResponsiveDialog from "./common/Dialog";
import MainLogo from '../images/MainLogo';

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });

// css style to the form
const useStyles = LoginFormCss;
const useGlobalStyles = FormGlobalStyle;

// initial the formik form values for the register form
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

/// ---------------------------------- LoginFormM component-----------------------------
const LoginFormM = () => {
  const [isRtl] = useState(true);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  // route consts

  useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [isRtl]);

  const classes = useStyles();
  const globalClass = useGlobalStyles();

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  useLayoutEffect(() => {
    // console.log('useLayoutEffect')
    if (otp) {
      window.history.pushState(null, document.title, window.location.href);
      window.onpopstate = function (event) {
        !displayDialog ? setDisplayDialog(true) : setDisplayDialog(false);
      };
    } else {
      window.onpopstate = () => {};
    }
  });


  // initialize form values
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // send User Info To DB
  const sendUserInfoToDB = async (userId) => {
    // create user object local
    const newUser = {
      firstname: formValues.firstName,
      lastname: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
    };
  };

  // handle Submit - register form
  const handleSubmit = async (values) => {
    // console.log(values)
    setLoading(true);
  };

  // console.log(FORM_LOGIN_VALIDATION);
  return (
    <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
      {/* <I18nextProvider> */}
      {/* <Grid item container xs={12} sm={6} > */}

      <Grid
        container
        direction="row"
        maxwidth="xs"
        item
        className="formWrapper"
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
            validationSchema={FORM_REGISTER_VALIDATION}
            onSubmit={(values, onSubmitProps) => {
              handleSubmit(values, onSubmitProps);
            }}
          >
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
                  <Grid className="input" item xs={12} justifyContent="center">
                    {/* <h1 className={classes.errorMassage}>{error}</h1>{" "} */}
                    <h1>{error}</h1>{" "}
                  </Grid>
                )}
                <Grid
                  direction="row"
                  container
                  justifyContent="center"
                  item
                  textAlign="right"
                  className="input"
                  xs={12}
                >
                  <Grid item xs={12} className="input">
                    {" "}
                    <Textfield name="firstName" label="שם פרטי" />
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
                  <Grid item xs={12} className="input">
                    <Textfield name="lastName" label="שם משפחה" />
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
                  <Grid item xs={12} className="input">
                    <Textfield name="email" label="מייל" />
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
                    <Textfield
                      name="phoneNumber"
                      label="פלאפון"
                      type="tel"
                      inputProps={{
                        inputMode: "tel",
                        pattern: "[0-9]*",
                      }}
                    />
                  </Grid>{" "}
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
          </Formik>
        </Grid>
        <Hidden mdDown>
          <Grid
            direction="column"
            container
            item
            xs={false}
            md={6}
            style={{
              background: "gray",
              height: "100vh",
              position: "fixed",
              marginRight: "50%",
              zIndex: -5,
            }}
          >
            <Grid
              //   className={classes.btnWrapper}
              container
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
              // style={{ minHeight: '10vh' }}
            >
              <div style={{ width: 300, height: 150, margin: 50 }}>
                <MainLogo></MainLogo>
              </div>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

      {/* {displayDialog && (
        <ResponsiveDialog
          displayDialog={displayDialog}
          setDisplayDialog={setDisplayDialog}
        ></ResponsiveDialog>
      )} */}
      {/* </Grid>  */}
      {/* </I18nextProvider> */}
    </ThemeProvider>
  );
};

export default LoginFormM;
